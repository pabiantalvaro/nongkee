from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from meets.models import UserProfile, Friendship, Meet, Participation, ChatMessage
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

DEMO_STUDENTS = [
    {
        'username': 'bian',
        'display_name': 'Bian Alvaro',
        'npm': '2606859093',
        'major': 'Ilmu Komputer',
        'bio': 'Lagi nyari tim PBP & mau belajar bareng!',
        'classes': ['Alin A', 'Analisis Numerik A'],
    },
    {
        'username': 'imanuel',
        'display_name': 'Imanuel Arya',
        'npm': '2606859101',
        'major': 'Ilmu Komputer',
        'bio': 'Backend dev & Nongkee maintainer.',
        'classes': ['Alin A', 'Analisis Numerik B'],
    },
    {
        'username': 'maiza',
        'display_name': 'Maiza Raditya',
        'npm': '2606859112',
        'major': 'Sistem Informasi',
        'bio': 'Manbis & Webdev enthusiast.',
        'classes': ['Alin B'],
    },
    {
        'username': 'nonapacil',
        'display_name': 'Nona Pacil',
        'npm': '2606859123',
        'major': 'Ilmu Komputer',
        'bio': 'Anak Pacil 24. Always studying at Lab or Kantin.',
        'classes': ['Alin B', 'Analisis Numerik C'],
    },
    {
        'username': 'cryinfairys',
        'display_name': 'Hana (cryinfairys)',
        'npm': '2606859134',
        'major': 'Ilmu Komputer',
        'bio': 'purple heart for the memes 💜',
        'classes': ['Alin C'],
    },
    {
        'username': 'peypuy',
        'display_name': 'Peypuy',
        'npm': '2606859145',
        'major': 'Sistem Informasi',
        'bio': 'Design UI/UX & ngopi santai.',
        'classes': ['Alin D'],
    },
    {
        'username': 'kejambreet',
        'display_name': 'Kejambreet',
        'npm': '2606859156',
        'major': 'Ilmu Komputer',
        'bio': 'Gamedev & competitive programming.',
        'classes': ['Alin A'],
    },
    {
        'username': 'fiqhi',
        'display_name': 'Fiqhi',
        'npm': '2606859167',
        'major': 'Ilmu Komputer',
        'bio': 'Pacil 24, ayo ngoding bareng.',
        'classes': ['Alin C'],
    },
    {
        'username': 'setip',
        'display_name': 'Setip',
        'npm': '2606859178',
        'major': 'Ilmu Komputer',
        'bio': 'Turu di stulo.',
        'classes': ['Alin B'],
    },
    {
        'username': 'ajen',
        'display_name': 'Ajen',
        'npm': '2606859189',
        'major': 'Ilmu Komputer',
        'bio': 'Kalo free kabarin yaa.',
        'classes': ['Alin D'],
    },
    {
        'username': 'rafif',
        'display_name': 'Rafif',
        'npm': '2606859201',
        'major': 'Sistem Informasi',
        'bio': 'Study session ready.',
        'classes': ['Analisis Numerik A'],
    },
    {
        'username': 'jonathan',
        'display_name': 'Jonathan',
        'npm': '2606859212',
        'major': 'Ilmu Komputer',
        'bio': 'AI / ML nerd.',
        'classes': ['Analisis Numerik B'],
    },
    {
        'username': 'nina',
        'display_name': 'Nina (Ilpus)',
        'npm': '2606859223',
        'major': 'Ilmu Perpustakaan',
        'bio': 'ilpus numpang di pacil <3',
        'classes': [],
    },
    {
        'username': 'cindireulla',
        'display_name': 'Cindireulla',
        'npm': '2606859234',
        'major': 'Ilmu Komputer',
        'bio': 'pbp ya allah tolong kami',
        'classes': ['Alin A'],
    },
    {
        'username': 'benishere',
        'display_name': 'Ben',
        'npm': '2606859245',
        'major': 'Ilmu Komputer',
        'bio': 'MIKIRIN KONSEP GAME 🎮',
        'classes': ['Analisis Numerik C'],
    },
]

class Command(BaseCommand):
    help = 'Seeds demo Pacil users, friends, profiles, and initial messages.'

    def handle(self, *args, **options):
        users_by_uname = {}
        for item in DEMO_STUDENTS:
            user, created = User.objects.get_or_create(username=item['username'])
            if created or not user.has_usable_password():
                user.set_password('pacil2026')
                user.save()
            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.display_name = item['display_name']
            profile.npm = item['npm']
            profile.major = item['major']
            profile.bio = item['bio']
            profile.enrolled_classes = item['classes']
            profile.save()
            users_by_uname[item['username']] = user

        # Setup friendships
        primary = users_by_uname.get('bian') or next(iter(users_by_uname.values()))
        for uname, friend in users_by_uname.items():
            if friend != primary:
                Friendship.objects.get_or_create(user=primary, friend=friend, defaults={'status': Friendship.Status.ACCEPTED})
                Friendship.objects.get_or_create(user=friend, friend=primary, defaults={'status': Friendship.Status.ACCEPTED})

        # Inter-friend connections
        friends_circle = ['imanuel', 'maiza', 'nonapacil', 'cryinfairys', 'peypuy']
        for u1 in friends_circle:
            for u2 in friends_circle:
                if u1 != u2:
                    user1 = users_by_uname[u1]
                    user2 = users_by_uname[u2]
                    Friendship.objects.get_or_create(user=user1, friend=user2, defaults={'status': Friendship.Status.ACCEPTED})

        # Seed initial direct messages
        nonapacil = users_by_uname['nonapacil']
        cryinfairys = users_by_uname['cryinfairys']
        ChatMessage.objects.get_or_create(
            sender=nonapacil,
            recipient=primary,
            text='Halo Bian! Hari ini ada jadwal nongkee di kantin gak?',
        )
        ChatMessage.objects.get_or_create(
            sender=primary,
            recipient=nonapacil,
            text='Halo! Ada nanti abis Alin jam 13:00 mau ngerjain tugas bareng.',
        )
        ChatMessage.objects.get_or_create(
            sender=cryinfairys,
            recipient=primary,
            text='biann nanti sore mau bahas matif di perpus lt 2?',
        )

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(users_by_uname)} demo students, profiles, friendships, and sample chats!'))
