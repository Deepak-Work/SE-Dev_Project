from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from rest_framework import status
from rest_framework import serializers

from .serializers import PostSerializer

class CreatePostView(APIView):
    serializer_class = PostSerializer

    def post(self, request):
        serializer_class = self.serializer_class(data=request.data)
        if serializer_class.is_valid():
            title = serializer_class.data.get('title')
            author = request.user
            body = serializer_class.data.get('body')
            image = serializer_class.data.get('image')
            summary = serializer_class.data.get('summary')
            club = self.context['request'].parser_context['kwargs']['id']
            post = Post.objects.create(title=title, author=author, body=body, summary=summary, club=club, image=image)
            
            post.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetPostView(APIView):

    def get(self, request, id):
        id = self.context['request'].parser_context['kwargs'].get('id', None)
        if id is None:
            c = Post.objects.order_by('-timestamp').values()
        else:
            c = Post.objects.filter(id=id).order_by('-timestamp').values()
        if c:
            return Response({'post_data': c}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    



class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'body', 'image']  

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.body = validated_data.get('body', instance.body)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

    

class DeletePostView(APIView):
    def delete(self, request, id):
        id = self.context['request'].parser_context['kwargs'].get('id', None)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            Post.objects.filter(id=id).delete()
            return Response(status=status.HTTP_200_OK)
    pass


