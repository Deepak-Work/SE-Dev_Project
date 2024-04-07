from django.urls import path

from .views import ProfileView, EditProfileView

urlpatterns = [
    path("profile", ProfileView.as_view()),
    path("edit", EditProfileView.as_view()),
]