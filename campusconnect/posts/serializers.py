from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator

from .models import Post



        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
