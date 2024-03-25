from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["club", "content"]
        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["club", "content", "created_at"]