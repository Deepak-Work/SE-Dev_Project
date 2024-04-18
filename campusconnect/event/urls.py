from django.urls import path

from .views import CreateEventView, GetEventView, GetEventsView

urlpatterns = [
    path("new-event/<str:club_name>/<int:club_id>", CreateEventView.as_view()),
    path("<str:name>/<int:id>", GetEventView.as_view()),
    path("club-events", GetEventsView.as_view()),
]