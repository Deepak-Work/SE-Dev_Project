from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .serializers import CreateUserSerializer,LoginUserSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
    serializer_class = LoginUserSerializer

    def post(self, request):         
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')


            # If username is not present in the database at all
            user_exist_query = User.objects.filter(username=username)

            if not user_exist_query.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST) ###We can add a message here later

            # If username and password match
            user_auth_query = authenticate(username=username, password=password)

            if user_auth_query is not None:
                login(request, user_auth_query)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)


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