from django.urls import path

from .views import ProfileView, EditUsernameView, EditPasswordView, EditImageView

urlpatterns = [
    path("profile/<str:name>", ProfileView.as_view()),
    path("edit/username", EditUsernameView.as_view()),
    path("edit/password", EditPasswordView.as_view()),
    path("edit/image", EditImageView.as_view()),
]