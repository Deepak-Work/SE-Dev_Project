from django.urls import path

from .views import CreatePostView, GetPostView

urlpatterns = [
    path("new-post", CreatePostView.as_view()),
    path("<str:name>/<int:id>", GetPostView.as_view()),
]