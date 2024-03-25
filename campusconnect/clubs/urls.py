from django.urls import path

from .views import CreateClubView, GetClubView

urlpatterns = [
    path("create", CreateClubView.as_view()),
    path("fetch/<str:name>/<int:id>", GetClubView.as_view()),
]