from django.urls import path

from .views import CreatePostView, GetPostView, EditPostView, DeletePostView

urlpatterns = [
    path("new-post", CreatePostView.as_view()),
    path("<str:name>/<int:id>", GetPostView.as_view()),
    path("post/edit", EditPostView.as_view()),
    path("post/<int:id>/delete", DeletePostView.as_view()),
    path("post/<int:id>", GetPostView.as_view()),

]