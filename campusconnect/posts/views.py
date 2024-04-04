from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comment
from rest_framework import status

from clubs.models import Club

from .serializers import PostSerializer, CommentSerializer


# Post Views Functions here
class CreatePostView(APIView):
    serializer_class = PostSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            print(request.user)
            author = request.user
            body = serializer.data.get('body')
            club = Club.objects.get(id=request.data['id'])
            post = Post.objects.create(title=title, author=author, body=body, club=club)

            # TODO: Add post image and summary of post            
            post.save()
            return Response(status=status.HTTP_201_CREATED)
        
        else:
            print("serializer invalid")
        

        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetPostView(APIView):

    def get(self, request, name, id):
        print("Here")
        if id is None:
            c = Post.objects.order_by('-time_posted').values()
        else:
            c = Post.objects.filter(id=id).order_by('-time_posted').values()
        if c:
            print(c[0])
            return Response({'post_data': c}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    



class EditPostView(APIView):
    
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



# Comments view functions here
class CreateCommentView(APIView):
    serializer_class = CommentSerializer
    
    def post(self, request):
        serializer_class = self.serializer_class(data=request.data)
        if serializer_class.is_valid():
            body = serializer_class.data.get('body')
            author = request.user
            post = self.context['request'].parser_context['kwargs']['id']
            comment = Comment.objects.create(body=body, author=author, post=post)
            
            comment.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

class GetCommentView(APIView):
    def get(self, request):
        id = self.context['request'].parser_context['kwargs'].get('id', None)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            c = Comment.objects.filter(post=id).order_by('-timestamp').values()
            return Response({'comment_data': c}, status=status.HTTP_200_OK)

class EditCommentView(APIView):
    def put(self, request, instance_id, validated_data):
        instance = Comment.objects.get(id=instance_id)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            instance.body = validated_data.get('body', instance.body)
            instance.save()
            return Response(status=status.HTTP_200_OK)

class DeleteCommentView(APIView):
    def delete(self, request, instance_id):
        instance = Comment.objects.get(id=instance_id)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            Comment.objects.filter(id=id).delete()
            return Response(status=status.HTTP_200_OK)