from django.urls import path

from .views import CreatePostView, GetPostView, EditPostView, DeletePostView

urlpatterns = [
    path("create", CreatePostView.as_view()),
    path("fetch/post/edit", EditPostView.as_view()),
    path("fetch/post/<int:id>/delete", DeletePostView.as_view()),
    path("fetch/<str:name>/<int:id>", GetPostView.as_view()),
    path("fetch/post/<int:id>", GetPostView.as_view()),

]