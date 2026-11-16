from datetime import timedelta
import requests

from django.conf import settings
from django.contrib.auth import get_user_model, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.db import IntegrityError, transaction
from django.db.models import Prefetch, Q
from django.http import HttpResponseBadRequest, HttpResponseForbidden, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from .forms import CreateMeetForm, SlotForm
from .models import ChatMessage, Friendship, Meet, Participation, RoomUse, UserProfile
from .timetable import BUILDINGS, DAYS, get_user_status, initial_slot, local_end, local_start, room_keys, room_options, timetable

User = get_user_model()


def meet_queryset():
    return Meet.objects.select_related('host').prefetch_related(
        Prefetch('participants', queryset=Participation.objects.select_related('user')),
    )


def active_meet(meet):
    return local_end(meet.date, meet.window) > timezone.now()


def membership(meet, user):
    return next((member for member in meet.participants.all() if member.user_id == user.pk), None)


def detail_context(meet, user):
    return {
        'meet': meet,
        'attendees': [member for member in meet.participants.all() if member.status == Participation.Status.JOINED],
        'pending': [member for member in meet.participants.all() if member.status == Participation.Status.PENDING],
        'member': membership(meet, user),
        'is_host': meet.host_id == user.pk,
        'active': active_meet(meet),
        'day_label': DAYS[meet.date.weekday()],
    }


@require_GET
def home(request, page='home'):
    date, window = initial_slot()
    today = timezone.localdate()
    days = [today + timedelta(days=offset) for offset in range(7)]
    meet_list = []
    if page != 'rooms_page':
        meets = meet_queryset()
        if page == 'mine':
            if request.user.is_authenticated:
                meets = meets.filter(Q(host=request.user) | Q(participants__user=request.user)).distinct()
            else:
                meets = meets.none()
        else:
            meets = meets.filter(date__gte=today)
        for meet in meets:
            if page == 'mine' or active_meet(meet):
                details = detail_context(meet, request.user)
                details['avatars'] = [meet.host] + [member.user for member in details['attendees']]
                details['extra'] = max(len(details['avatars']) - 3, 0)
                meet_list.append(details)

    detail = None
    selected = request.GET.get('meet', '')
    if selected.isascii() and selected.isdecimal() and len(selected) <= 18:
        meet = meet_queryset().filter(pk=int(selected)).first()
        if meet:
            detail = detail_context(meet, request.user)

    return render(request, 'meets/home.html', {
        'page': page,
        'meet_list': meet_list,
        'detail': detail,
        'date': date,
        'window': window,
        'day_options': [(day, DAYS[day.weekday()]) for day in days if day.weekday() < len(DAYS)],
        'windows': Meet.Window.choices,
        'topics': Meet.Topic.choices,
        'join_modes': Meet.JoinMode.choices,
        'buildings': BUILDINGS,
    })


@require_GET
@never_cache
def rooms(request):
    form = SlotForm(request.GET)
    building = request.GET.get('building', 'new')
    picker = request.GET.get('picker') == '1'
    allowed = {value for value, _ in BUILDINGS}
    if picker:
        allowed.add('casual')
    if building not in allowed or not form.is_valid():
        return HttpResponseBadRequest('Choose a valid day, time and area.')

    date = form.cleaned_data['date']
    window = form.cleaned_data['window']
    options = room_options(date, window, building, include_casual=picker)
    can_start = local_start(date, window) > timezone.now()
    return render(request, 'meets/room_cards.html', {
        'picker': picker,
        'rooms': options,
        'available': sum(not room['busy'] for room in options) if can_start else 0,
        'window': Meet.Window(window).label,
        'can_start': can_start,
    })


@require_GET
@never_cache
def detail(request, pk):
    meet = get_object_or_404(meet_queryset(), pk=pk)
    return render(request, 'meets/detail.html', {
        'detail': detail_context(meet, request.user),
        'page': request.GET.get('page', 'home'),
    })


@login_required
@require_POST
def create(request):
    form = CreateMeetForm(request.POST)
    if not form.is_valid():
        return JsonResponse({'error': ' '.join(str(error) for errors in form.errors.values() for error in errors)}, status=400)

    try:
        with transaction.atomic():
            meet = Meet.objects.create(host=request.user, **form.cleaned_data)
            if meet.room in timetable()['academic']:
                RoomUse.objects.bulk_create([
                    RoomUse(meet=meet, room_key=key, date=meet.date, window=meet.window)
                    for key in room_keys(meet.room)
                ])
    except IntegrityError:
        return JsonResponse({'error': 'A meet already uses this classroom at that time. Choose another room.'}, status=409)
    return JsonResponse({'url': f'{reverse("meets:mine")}?meet={meet.pk}'}, status=201)


@login_required
@require_POST
def act(request, pk):
    action = request.POST.get('action')
    page = request.POST.get('page')
    destination = reverse(f'meets:{page}' if page in ('mine', 'rooms_page') else 'meets:home')
    with transaction.atomic():
        meet = get_object_or_404(Meet.objects.select_for_update(), pk=pk)
        is_host = meet.host_id == request.user.pk
        if action in ('cancel', 'approve', 'decline') and not is_host:
            return HttpResponseForbidden('Only the host can manage this meet.')
        if action in ('join', 'leave') and is_host:
            return HttpResponseBadRequest('The host is already part of this meet.')

        if action == 'cancel':
            meet.delete()
            return redirect(destination)
        if action in ('join', 'approve') and not active_meet(meet):
            return HttpResponseBadRequest('This meet has ended.')
        if action == 'join':
            status = Participation.Status.JOINED if meet.join_mode == Meet.JoinMode.DIRECT else Participation.Status.PENDING
            Participation.objects.get_or_create(meet=meet, user=request.user, defaults={'status': status})
        elif action == 'leave':
            Participation.objects.filter(meet=meet, user=request.user).delete()
        elif action in ('approve', 'decline'):
            member_id = request.POST.get('member', '')
            if not (member_id.isascii() and member_id.isdecimal() and len(member_id) <= 18):
                return HttpResponseBadRequest('Choose a valid join request.')
            member = get_object_or_404(Participation, pk=int(member_id), meet=meet, status=Participation.Status.PENDING)
            if action == 'approve':
                member.status = Participation.Status.JOINED
                member.save(update_fields=['status'])
            else:
                member.delete()
        else:
            return HttpResponseBadRequest('Unknown meet action.')

    return redirect(f'{destination}?meet={pk}')


@require_http_methods(['GET', 'POST'])
def signup(request):
    if request.user.is_authenticated:
        return redirect('meets:home')
    next_url = request.POST.get('next') or request.GET.get('next', '')
    if not url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}, require_https=request.is_secure()):
        next_url = ''
    form = UserCreationForm(request.POST if request.method == 'POST' else None)
    if request.method == 'POST' and form.is_valid():
        login(request, form.save())
        return redirect(next_url or 'meets:home')
    return render(request, 'meets/auth.html', {'form': form, 'signup': True, 'next': next_url})


@require_GET
def friends_view(request):
    if not request.user.is_authenticated:
        demo_profiles = UserProfile.objects.select_related('user').all()[:8]
        demo_list = []
        for p in demo_profiles:
            demo_list.append({
                'user': p.user,
                'profile': p,
                'status': get_user_status(p.user),
            })
        return render(request, 'meets/friends.html', {
            'authenticated': False,
            'friends': demo_list,
            'my_meets': [],
        })

    # Ensure profile for user
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if not profile.display_name:
        profile.display_name = request.user.username.title()
        profile.save()

    # Friends list
    friendships = Friendship.objects.filter(
        user=request.user,
        status=Friendship.Status.ACCEPTED,
    ).select_related('friend', 'friend__profile')

    friends_list = []
    for f in friendships:
        friend_user = f.friend
        status = get_user_status(friend_user)
        friends_list.append({
            'user': friend_user,
            'profile': getattr(friend_user, 'profile', None),
            'status': status,
            'friendship_id': f.pk,
        })

    # Priority sorting: ongoing meets first, ongoing classes second, free third
    state_order = {'meet': 0, 'class': 1, 'free': 2}
    friends_list.sort(key=lambda item: (state_order.get(item['status']['state'], 3), item['user'].username))

    # Incoming pending requests
    pending_incoming = Friendship.objects.filter(
        friend=request.user,
        status=Friendship.Status.PENDING,
    ).select_related('user', 'user__profile')

    # Suggested Pacil classmates
    friend_ids = {f.friend_id for f in friendships}
    friend_ids.add(request.user.id)
    suggested = User.objects.exclude(id__in=friend_ids).select_related('profile')[:6]

    # My meets summary (hosted or joined)
    my_meets = meet_queryset().filter(Q(host=request.user) | Q(participants__user=request.user)).distinct()
    my_meets_list = []
    for m in my_meets:
        details = detail_context(m, request.user)
        details['avatars'] = [m.host] + [mbr.user for mbr in details['attendees']]
        my_meets_list.append(details)

    return render(request, 'meets/friends.html', {
        'authenticated': True,
        'friends': friends_list,
        'pending_requests': pending_incoming,
        'suggested': suggested,
        'my_meets': my_meets_list,
        'my_status': get_user_status(request.user),
    })


@login_required
@require_POST
def friends_action(request):
    action = request.POST.get('action')  # 'add', 'accept', 'decline', 'remove'
    target_username = request.POST.get('username')
    target_id = request.POST.get('user_id')

    target_user = None
    if target_username:
        target_user = User.objects.filter(username=target_username.strip().lower()).first()
    elif target_id and target_id.isdecimal():
        target_user = User.objects.filter(pk=int(target_id)).first()

    if target_user and target_user != request.user:
        if action == 'add':
            Friendship.objects.get_or_create(user=request.user, friend=target_user, defaults={'status': Friendship.Status.ACCEPTED})
            Friendship.objects.get_or_create(user=target_user, friend=request.user, defaults={'status': Friendship.Status.ACCEPTED})
        elif action == 'remove':
            Friendship.objects.filter(
                Q(user=request.user, friend=target_user) | Q(user=target_user, friend=request.user)
            ).delete()
        elif action == 'accept':
            Friendship.objects.filter(user=target_user, friend=request.user).update(status=Friendship.Status.ACCEPTED)
            Friendship.objects.get_or_create(user=request.user, friend=target_user, defaults={'status': Friendship.Status.ACCEPTED})
        elif action == 'decline':
            Friendship.objects.filter(user=target_user, friend=request.user).delete()

    return redirect('meets:friends')


@login_required
def chat_messages(request):
    if request.method == 'GET':
        meet_id = request.GET.get('meet')
        friend_id = request.GET.get('friend')
        since_id = request.GET.get('since', 0)

        try:
            since_id = int(since_id)
        except ValueError:
            since_id = 0

        qs = ChatMessage.objects.select_related('sender', 'sender__profile')
        if meet_id and meet_id.isdecimal():
            qs = qs.filter(meet_id=int(meet_id))
        elif friend_id and friend_id.isdecimal():
            fid = int(friend_id)
            qs = qs.filter(
                (Q(sender=request.user, recipient_id=fid) | Q(sender_id=fid, recipient=request.user))
            )
        else:
            return JsonResponse({'error': 'Specify meet or friend ID.'}, status=400)

        if since_id > 0:
            qs = qs.filter(id__gt=since_id)
        else:
            qs = qs.order_by('-created_at')[:40]
            qs = list(reversed(qs))

        messages = []
        for msg in qs:
            profile = getattr(msg.sender, 'profile', None)
            sender_name = profile.display_name if profile and profile.display_name else msg.sender.username
            messages.append({
                'id': msg.id,
                'sender': msg.sender.username,
                'sender_name': sender_name,
                'text': msg.text,
                'time': timezone.localtime(msg.created_at).strftime('%H:%M'),
                'is_me': msg.sender_id == request.user.id,
            })
        return JsonResponse({'messages': messages})

    elif request.method == 'POST':
        meet_id = request.POST.get('meet_id')
        recipient_id = request.POST.get('recipient_id')
        text = (request.POST.get('text') or '').strip()

        if not text:
            return JsonResponse({'error': 'Message cannot be empty.'}, status=400)

        meet = None
        recipient = None
        if meet_id and meet_id.isdecimal():
            meet = get_object_or_404(Meet, pk=int(meet_id))
        elif recipient_id and recipient_id.isdecimal():
            recipient = get_object_or_404(User, pk=int(recipient_id))
        else:
            return JsonResponse({'error': 'Destination not specified.'}, status=400)

        msg = ChatMessage.objects.create(
            sender=request.user,
            meet=meet,
            recipient=recipient,
            text=text[:1200],
        )
        profile = getattr(request.user, 'profile', None)
        return JsonResponse({
            'message': {
                'id': msg.id,
                'sender': request.user.username,
                'sender_name': profile.display_name if profile and profile.display_name else request.user.username,
                'text': msg.text,
                'time': timezone.localtime(msg.created_at).strftime('%H:%M'),
                'is_me': True,
            }
        }, status=201)


@csrf_exempt
@require_POST
def google_auth(request):
    token = request.POST.get('credential') or request.POST.get('id_token')
    demo_email = request.POST.get('demo_email')

    email = None
    name = None
    picture = ''

    if token:
        try:
            resp = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={token}', timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                email = data.get('email')
                name = data.get('name') or data.get('given_name')
                picture = data.get('picture', '')
        except Exception:
            pass

    if not email and demo_email:
        email = demo_email.strip().lower()
        name = email.split('@')[0].replace('.', ' ').title()

    if not email:
        return JsonResponse({'error': 'Missing or invalid Google sign-in credentials.'}, status=400)

    username = email.split('@')[0][:30].lower()
    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    if created or not user.email:
        user.email = email
        user.save()

    profile, _ = UserProfile.objects.get_or_create(user=user)
    if name and not profile.display_name:
        profile.display_name = name
    if picture and not profile.avatar_url:
        profile.avatar_url = picture
    profile.save()

    login(request, user)
    request.session.set_expiry(60 * 60 * 24 * 365)  # 1 year persistent session

    next_url = request.POST.get('next') or request.GET.get('next') or reverse('meets:home')
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' or request.content_type == 'application/json':
        return JsonResponse({'success': True, 'redirect': next_url})
    return redirect(next_url)
