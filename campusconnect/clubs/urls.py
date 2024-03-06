from django.urls import path

from .views import ClubApplicationView

urlpatterns = [
    path("application", ClubApplicationView.as_view()),
]