from django.contrib.auth.models import User

from rest_framework import serializers

from authentication.models import CustomUser

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username',)

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('password',)