from django.contrib.auth import views as auth_views
from django.urls import path

from . import views

app_name = 'meets'

urlpatterns = [
    path('', views.home, name='home'),
    path('friends/', views.friends_view, name='friends'),
    path('friends/action/', views.friends_action, name='friends_action'),
    path('my-meets/', views.home, {'page': 'mine'}, name='mine'),
    path('rooms/', views.home, {'page': 'rooms_page'}, name='rooms_page'),
    path('rooms/options/', views.rooms, name='room_options'),
    path('meets/create/', views.create, name='create'),
    path('meets/<int:pk>/', views.detail, name='detail'),
    path('meets/<int:pk>/action/', views.act, name='act'),
    path('api/chat/messages/', views.chat_messages, name='chat_messages'),
    path('auth/google/', views.google_auth, name='google_auth'),
    path('login/', auth_views.LoginView.as_view(template_name='meets/auth.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', views.signup, name='signup'),
]
