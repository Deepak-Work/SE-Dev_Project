from django.urls import path

from .views import LoginView, RegisterView, LogoutView, CheckAuthView, VerifyEmailView

urlpatterns = [
    path('login', LoginView.as_view()),
    path('register', RegisterView.as_view()),
    path('logout', LogoutView.as_view()),
    path('isauth', CheckAuthView.as_view()),
    path('verify-email/<str:uidb64>/<str:token>', VerifyEmailView.as_view())
]