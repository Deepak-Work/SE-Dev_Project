from django.contrib.auth.models import User

from rest_framework import serializers

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password',)