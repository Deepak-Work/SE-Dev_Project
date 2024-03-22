from django.urls import path

from .views import CreateClubView

urlpatterns = [
    path("create", CreateClubView.as_view()),
]