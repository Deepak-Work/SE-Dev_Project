from django.urls import path

from .views import CreateClubView, GetClubView, FollowClubView, UnfollowClubView, getFollowStatus

urlpatterns = [
    path("create", CreateClubView.as_view()),
    path("fetch/<str:name>/<int:id>", GetClubView.as_view()),
    path("follow/<str:name>/<int:id>", FollowClubView.as_view()),
    path("unfollow/<str:name>/<int:id>", UnfollowClubView.as_view()),
    path("getFollowStatus/<str:name>/<int:id>", getFollowStatus.as_view())
]