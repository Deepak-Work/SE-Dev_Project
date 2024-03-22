from rest_framework import serializers
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import User
from .models import Club

class ClubSerializer(serializers.Serializer):
    class Meta:
        model = Club
        exclude = ('member_count',)