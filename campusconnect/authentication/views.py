from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .serializers import CreateUserSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
    pass


class RegisterView(APIView):
    def post(self, request):         
        serializer = CreateUserSerializer
        if serializer.is_valid():
            username = serializer.get('username')
            first_name, last_name = serializer.get('firstname'), serializer.get('lastname')
            email = serializer.get('email')
            password = serializer.get('password')
                        
            # If username is not unique, return 400
            queryset = User.objects.filter(username=username)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            # Create user and commit changes
            user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, 
                                            email=email, password=password)
            user.save()
            
            print("Register request received")
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)