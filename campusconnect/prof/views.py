from django.shortcuts import render

from django.contrib.auth.models import User

from .models import Profile

from .serializers import UsernameSerializer, PasswordSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ProfileView(APIView):
    def get(self, request, name):
        if request.user.is_authenticated:
            if not User.objects.filter(username=name).exists():
                return Response(status=status.HTTP_404_NOT_FOUND)
            if name == request.user.username:
                return Response({"is_self": True, "name": request.user.first_name + " " + request.user.last_name, "username": request.user.username, "email": request.user.email, "image": request.user.profile.image.url}, status=status.HTTP_200_OK)
            else:
                user = User.objects.get(username=name)
                return Response({"is_self": False, "name": user.first_name + " " + user.last_name, "username": user.username, "email": user.email, "image": user.profile.image.url}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class EditUsernameView(APIView):
    serializer_class = UsernameSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            uname = serializer.data.get('username')

            if User.objects.filter(username=uname).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)

            u = User.objects.get(id=request.user.id)
            u.username = uname
            u.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class EditPasswordView(APIView):
    serializer_class = PasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pwd = serializer.data.get('password')

            u = User.objects.get(id=request.user.id)
            u.set_password(pwd)
            u.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class EditImageView(APIView):
    def post(self, request):
        print(request.data['image'])
        
        profile = Profile.objects.get(user=request.user)
        profile.image = request.data['image']
        profile.save()
        return Response(status=status.HTTP_200_OK)