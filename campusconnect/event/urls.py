from django.urls import path

from .views import CreateEventView, GetEventView, GetEventsView, EditEventView, DeleteEventView
from .views import *

urlpatterns = [
    path("new-event/<str:club_name>/<int:club_id>", CreateEventView.as_view()),
    # path("<str:name>/<int:id>", GetEventView.as_view()),
    path("event/<int:id>", GetEventView.as_view()),
    path("event/<int:id>/edit", EditEventView.as_view()),
    path("event/<int:id>/delete", DeleteEventView.as_view()),
    path("club-events", GetEventsView.as_view()),

    path("event/<int:id>/like", LikeEventView.as_view()), 
    path("event/<int:id>/unlike", UnlikeEventView.as_view()),
    path("event/<int:id>/dislike", DislikeEventView.as_view()), 
    path("event/<int:id>/undislike", UndislikeEventView.as_view()),
    path("event/<int:id>/like-dislike", LikeDislikeEventView.as_view()),
    
    path("event/<int:id>/attending-status", AttendingEventView.as_view()),
    path("event/<int:id>/attend", AttendEventView.as_view()),
    path("event/<int:id>/unattend", UnattendEventView.as_view()),

]