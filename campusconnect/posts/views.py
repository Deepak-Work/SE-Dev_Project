from django.shortcuts import render
from rest_framework.views import APIView

from .serializers import PostSerializer

class CreatePostView(APIView):
    serializer_class = PostSerializer

    pass

class GetPostView(APIView):

    pass

class EditPostView(APIView):

    pass

class DeletePostView(APIView):
    
    pass


