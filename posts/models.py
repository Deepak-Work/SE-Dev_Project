from django.db import models

from django.contrib.auth.models import User

from clubs.models import Club

import datetime

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=128)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    image = models.ImageField(upload_to='images', blank=True, null=True, default=None)
    summary = models.TextField(max_length=255, default="No Summary")
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    time_posted = models.DateTimeField(default=datetime.datetime.now)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    time_posted = models.DateTimeField(default=datetime.datetime.now)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True,blank=True, default=None,  related_name='replies')
    
    def __str__(self):
        return self.body
    
# class Reaction(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     like = models.BooleanField(default=False)
#     dislike = models.BooleanField(default=False)

class React(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)

class CommentReact(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)

