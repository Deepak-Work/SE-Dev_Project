from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .serializers import CreateUserSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
    pass


class RegisterView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request):         
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            first_name, last_name = serializer.data.get('first_name'), serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
                        
            # If username is not unique, return 400
            queryset = User.objects.filter(username=username)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            # Create user and commit changes
            user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, 
                                            email=email, password=password)
            user.save()
            
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)