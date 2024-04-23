from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comment
from rest_framework import status
from django.contrib.auth.models import User

from clubs.models import Club

from .serializers import PostSerializer, CommentSerializer


# Post Views Functions here
class CreatePostView(APIView):
    serializer_class = PostSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            author = request.user
            body = serializer.data.get('body')
            image = request.data.get("image")
            club = Club.objects.get(id=request.data['id'])
            post = Post.objects.create(title=title, author=author, body=body, club=club, image=image)
            
            # TODO: Add post image and summary of post            
            post.save()
            return Response(status=status.HTTP_201_CREATED)
        
        else:
            print("serializer invalid")
        

        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetPostView(APIView):

    def get(self, request, name, id):
        if id is None:
            posts = Post.objects.order_by('-time_posted').values()
            for post in posts:
                post['author'] = User.objects.get(id=post['author_id']).username
                post['club_name'] = Club.objects.get(id=post['club_id']).name
                del post['author_id']
        else:
            posts = Post.objects.filter(id=id).order_by('-time_posted').values()[0]
            posts['author'] = User.objects.get(id=posts['author_id']).username
            club = Club.objects.get(id=posts['club_id'])
            posts['club_name'] = club.name
            posts['club_image'] = club.image.url
            post_image = Post.objects.get(id=id).image
            if post_image:
                posts['image'] = post_image.url
            del posts['author_id']
        if posts:
            return Response({'post_data': posts}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    



class EditPostView(APIView):        
    serializer_class = PostSerializer

    def put(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            post = Post.objects.get(id=request.data['id'])
            post.title = serializer.data.get('title')
            post.body = serializer.data.get('body')
            post.image = request.data.get('image')
            # if serializer.data.get('title'):
            #     post.title = serializer.data.get('title')
            # if serializer.data.get('body'):
            #     post.body = serializer.data.get('body')
            # if serializer.data.get('image'):
            #     post.image = serializer.data.get('image')
            post.save()
        else:
            print("Serializer invalid - Edit")

        return Response(status=status.HTTP_201_CREATED)

    

class DeletePostView(APIView):
    def delete(self, request, id):
        # id = self.context['request'].parser_context['kwargs'].get('id', None)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            clubid = Post.objects.get(id=id).club.id
            clubname = Club.objects.get(id=clubid).name
            post = Post.objects.get(id=id)
            post.delete()
            return Response({'club_name':clubname,'club_id':clubid},status=status.HTTP_200_OK)
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