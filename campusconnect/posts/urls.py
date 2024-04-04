from django.urls import path

from .views import CreatePostView, GetPostView, EditPostView, DeletePostView

urlpatterns = [
    path("create", CreatePostView.as_view()),
    path("edit", EditPostView.as_view()),
    path("delete", DeletePostView.as_view()),
    path("fetch/<str:name>/<int:id>", GetPostView.as_view()),
    path("fetch/post/<int:id>", GetPostView.as_view()),

]