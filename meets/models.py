from django.conf import settings
from django.db import models


class Meet(models.Model):
    class Topic(models.TextChoices):
        STUDIES = 'Pacillian Studies', 'Pacillian Studies'
        WEB = 'WebDev', 'WebDev'
        GAME = 'GameDev', 'GameDev'
        AI = 'AI / ML', 'AI / ML'
        MANBIS = 'MANBIS', 'MANBIS'
        CASUAL = 'Casual', 'Casual Nongkee'

    class JoinMode(models.TextChoices):
        DIRECT = 'direct', 'Anyone can join'
        APPROVAL = 'approval', 'Host approves requests'

    class Window(models.TextChoices):
        MORNING = '08:00-10:00', '08:00 - 10:00'
        LATE_MORNING = '10:00-12:00', '10:00 - 12:00'
        EARLY_AFTERNOON = '13:00-15:00', '13:00 - 15:00'
        LATE_AFTERNOON = '15:00-17:00', '15:00 - 17:00'

    title = models.CharField(max_length=100)
    topic = models.CharField(max_length=24, choices=Topic.choices)
    join_mode = models.CharField(max_length=8, choices=JoinMode.choices, default=JoinMode.DIRECT)
    date = models.DateField()
    window = models.CharField(max_length=11, choices=Window.choices)
    room = models.CharField(max_length=140)
    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hosted_meets')

    class Meta:
        ordering = ['date', 'window', 'pk']

    def __str__(self):
        return self.title


class RoomUse(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE, related_name='room_uses')
    room_key = models.CharField(max_length=140)
    date = models.DateField()
    window = models.CharField(max_length=11, choices=Meet.Window.choices)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['date', 'window', 'room_key'], name='unique_classroom_slot')]


class Participation(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        JOINED = 'joined', 'Joined'

    meet = models.ForeignKey(Meet, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=7, choices=Status.choices)

    class Meta:
        ordering = ['pk']
        constraints = [models.UniqueConstraint(fields=['meet', 'user'], name='unique_meet_participant')]


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=100, blank=True)
    avatar_url = models.CharField(max_length=300, blank=True, default='')
    npm = models.CharField(max_length=20, blank=True, default='')
    major = models.CharField(max_length=60, default='Ilmu Komputer')
    bio = models.CharField(max_length=200, blank=True, default='')
    enrolled_classes = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.display_name or self.user.username

    def get_avatar_display(self):
        return (self.display_name or self.user.username)[:1].upper()


class Friendship(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        ACCEPTED = 'accepted', 'Accepted'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='friendships')
    friend = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='friended_by')
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACCEPTED)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        constraints = [models.UniqueConstraint(fields=['user', 'friend'], name='unique_friendship')]

    def __str__(self):
        return f'{self.user.username} -> {self.friend.username} ({self.status})'


class ChatMessage(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE, null=True, blank=True, related_name='chat_messages')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='direct_messages')
    text = models.TextField(max_length=1200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at', 'pk']

    def __str__(self):
        dest = f'Meet #{self.meet_id}' if self.meet_id else f'User #{self.recipient_id}'
        return f'{self.sender.username} to {dest}: {self.text[:30]}'
