from rest_framework import serializers
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import User


class ClubApplicationSerializer(serializers.Serializer):
    club_name = serializers.CharField()
    club_description = serializers.CharField()
    club_location = serializers.CharField()
    club_email = serializers.EmailField()
    club_contact = serializers.IntegerField(10)
    club_website = serializers.URLField()
    club_image = serializers.ImageField()
    club_member = serializers.IntegerField()
    club_organizer = serializers.IntegerField()