from django.urls import path

from .views import CreateClubView, GetClubView, FollowClubView, UnfollowClubView, GetFollowStatus, GetExploreClubsView, GetFollowedClubsView, ToggleFollowClubView

urlpatterns = [
    path("create", CreateClubView.as_view()),
    path("fetch/<str:name>/<int:id>", GetClubView.as_view()),
    path("ToggleFollow/<int:id>", ToggleFollowClubView.as_view()),
    path("follow/<str:name>/<int:id>", FollowClubView.as_view()),
    path("unfollow/<str:name>/<int:id>", UnfollowClubView.as_view()),
    path("GetFollowStatus/<str:name>/<int:id>", GetFollowStatus.as_view()),
    path("fetch/GetExploreClubs", GetExploreClubsView.as_view()),
    path("fetch/GetFollowedClubs", GetFollowedClubsView.as_view()),
]