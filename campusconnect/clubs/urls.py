from django.urls import path

from .views import CreateClubView, GetClubView, GetExploreClubsView, GetFollowedClubsView

urlpatterns = [
    path("create", CreateClubView.as_view()),
    path("fetch/<str:name>/<int:id>", GetClubView.as_view()),
    path("fetch/GetExploreClubs", GetExploreClubsView.as_view()),
    path("fetch/GetFollowedClubs", GetFollowedClubsView.as_view())
]