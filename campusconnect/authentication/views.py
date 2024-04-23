from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse

from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings


from prof.models import Profile

from .serializers import CreateUserSerializer,LoginUserSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
    serializer_class = LoginUserSerializer

    def post(self, request, format=None):         
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')


            # If username is not present in the database at all
            user_exist_query = User.objects.filter(username=username)

            if not user_exist_query.exists():
                return JsonResponse({"error": "Username does not exist"}, status = 401)
            
            profile = Profile.objects.get(user=user_exist_query.first())
            if not profile.is_verified:
                return JsonResponse({"error": "Please verify your email"}, status = 401)

            # If username and password match
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login Successful"}, status = 200)
            else:
                return JsonResponse({"error": "Username and Password combination is incorrect"}, status = 401)
        return JsonResponse({"error": "Bad Request"}, status=400)


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

            # For profile pictures
            profile = Profile.objects.create(user=user)
            profile.save()

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            verification_link = f"http://localhost:8000/verify-email/{uid}/{token}"
            send_mail(
                'Verify your email',
                f'Click the link to verify your email: {verification_link}',
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False
            )

            
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    

    
class CheckAuthView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            return Response({"username": request.user.username, "authenticated": True, "verified": profile.is_verified}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class VerifyEmailView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            profile = Profile.objects.get(user=user)
            profile.is_verified = True
            profile.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    