from rest_framework import serializers
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import User
from .models import Club, Follow

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields=('name', 'description', 'location', 'email', 'contact', 'website', 'image') 

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields=('user', 'club')
