from django.shortcuts import render

from django.contrib.auth.models import User

from .serializers import UserSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ProfileView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({"name": request.user.first_name + " " + request.user.last_name, "username": request.user.username, "email": request.user.email}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class EditProfileView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            uname = serializer.data.get('username')

            if User.objects.filter(username=uname).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)

            u = User.objects.get(id=request.user.id)
            u.username = uname
            u.password = serializer.data.get('password')
            u.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)