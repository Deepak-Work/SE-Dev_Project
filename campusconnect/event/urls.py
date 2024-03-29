from django.urls import path

from .views import CreateEventView, GetEventView

urlpatterns = [
    path("create", CreateEventView.as_view()),
    path("fetch/<str:name>/<int:id>", GetEventView.as_view()),
]