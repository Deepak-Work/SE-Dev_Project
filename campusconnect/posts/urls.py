from django.urls import path

from .views import CreatePostView, GetPostView

urlpatterns = [
    path("create", CreatePostView.as_view()),
    path("fetch/<str:name>/<int:id>", GetPostView.as_view()),
]