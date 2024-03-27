from rest_framework import serializers
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import User
from .models import Club

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields=('name', 'description', 'location', 'email', 'contact', 'website', 'image')