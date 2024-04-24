from django.urls import path

from .views import CreateClubView, GetClubView, FollowClubView, UnfollowClubView, GetFollowStatus, GetExploreClubsView, GetFollowedClubsView, ToggleFollowClubView, GetMyEventsView

urlpatterns = [
    path("create", CreateClubView.as_view()),
    path("<str:name>/<int:id>", GetClubView.as_view()),
    path("toggle-follow/<int:id>", ToggleFollowClubView.as_view()),
    path("follow/<str:name>/<int:id>", FollowClubView.as_view()),
    path("unfollow/<str:name>/<int:id>", UnfollowClubView.as_view()),
    path("follow-status/<str:name>/<int:id>", GetFollowStatus.as_view()),
    path("explore-clubs", GetExploreClubsView.as_view()),
    path("followed-clubs", GetFollowedClubsView.as_view()),\
    path("my-events", GetMyEventsView.as_view()),
]