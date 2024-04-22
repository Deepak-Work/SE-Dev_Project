from django.urls import path

from .views import CreatePostView, GetPostView, EditPostView, DeletePostView, CreateCommentView, GetCommentView, EditCommentView, DeleteCommentView, ReplyCommentView, LikePostView, UnlikePostView, DislikePostView, UndislikePostView

urlpatterns = [
    path("new-post", CreatePostView.as_view()),
    path("<str:name>/<int:id>", GetPostView.as_view()),
    path("post/edit", EditPostView.as_view()),
    path("post/<int:id>/delete", DeletePostView.as_view()),
    path("post/<int:id>", GetPostView.as_view()),
    path("comment/new", CreateCommentView.as_view()),
    path("comment/<int:id>", GetCommentView.as_view()), # this id has to be the post id to get all the comments of that post
    path("comment/edit/<int:id>", EditCommentView.as_view()),
    path("comment/<int:id>/delete", DeleteCommentView.as_view()),
    path("comment/<int:id>/reply", ReplyCommentView.as_view()), # this id has to be the comment id
    path("post/<int:id>/like", LikePostView.as_view()), # this id has to be the post id
    path("post/<int:id>/unlike", UnlikePostView.as_view()), # this id has to be the post id
    path("post/<int:id>/dislike", DislikePostView.as_view()), # this id has to be the post id
    path("post/<int:id>/undislike", UndislikePostView.as_view()), # this id has to be the post id
]