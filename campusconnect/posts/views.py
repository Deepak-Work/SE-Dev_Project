from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comment, React, CommentReact
from rest_framework import status
from django.contrib.auth.models import User

from clubs.models import Club, AuditLog, Follow

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
            log = AuditLog.objects.create(club=club, action="Created", item="Post: " + title, user=request.user)
            log.save()
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
    

# this is the new function
# class getPostsByClubView(APIView):
#     def get(self, request, id):
#         id = id.split(",")
#         print(id, type(id))
#         if id is None:
#             posts = Post.objects.order_by('-time_posted').values()
#         elif type(id) is list:
#             posts = Post.objects.filter(club__in=id).order_by('-time_posted').values()
#         else:
#             posts = Post.objects.filter(club=id).order_by('-time_posted').values()
#         if posts:
#             return Response({'posts_data': posts}, status=status.HTTP_200_OK)
#         return Response(status=status.HTTP_404_NOT_FOUND)

class getPostsByClubView(APIView):
    def get(self, request):
        # clubs = Follow.objects.filter(user=request.user)
        clubs = Club.objects.filter(follow__user = request.user)
        posts_by_club = []
        for club in clubs:
            posts = Post.objects.filter(club=club).order_by('-time_posted').values()
            for post in posts:
                post['author'] = User.objects.get(id=post['author_id']).username
            posts_by_club.append({"club_posts" : posts, "club_id": club.id, "club_name" : club.name, "club_image" : club.image.url})
        if clubs:
            return Response({'posts_by_club' :  posts_by_club}, status= status.HTTP_200_OK) 
        return Response(status= status.HTTP_404_NOT_FOUND); 


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
            print(post)
            post.delete()
            return Response({'club_name':clubname,'club_id':clubid},status=status.HTTP_200_OK)
    pass

class getLikeDislikeView(APIView):
    def get(self, request, id):
        print(id, "id")
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            post = Post.objects.get(id=id)
            print(React.objects.filter(user=request.user, post=post).exists())
            if React.objects.filter(user=request.user, post=post).exists():
                reaction = React.objects.get(user=request.user, post=post)
                return Response({'like_status':reaction.like, 'dislike_status':reaction.dislike}, status=status.HTTP_200_OK)
            else:
                return Response({'like_status':False, 'dislike_status':False}, status=status.HTTP_200_OK)

class LikePostView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            post = Post.objects.get(id=id)
            post.likes += 1
            post.save()
            if React.objects.filter(user=request.user, post=post).exists():
                reaction = React.objects.get(user=request.user, post=post)
                reaction.like = True
                reaction.save()
            else:
                reaction = React.objects.create(user=request.user, post=post, like=True)
                reaction.save()                
            return Response(status=status.HTTP_200_OK)

class UnlikePostView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            post = Post.objects.get(id=id)
            post.likes -= 1
            post.save()
            if React.objects.filter(user=request.user, post=post).exists():
                reaction = React.objects.get(user=request.user, post=post)
                reaction.like = False
                reaction.save()
            else:
                reaction = React.objects.create(user=request.user, post=post, like=False)
                reaction.save()
            return Response(status=status.HTTP_200_OK)

class DislikePostView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            post = Post.objects.get(id=id)
            post.dislikes += 1
            post.save()
            if React.objects.filter(user=request.user, post=post).exists():
                reaction = React.objects.get(user=request.user, post=post)
                reaction.dislike = True
                reaction.save()
            else:
                reaction = React.objects.create(user=request.user, post=post, dislike=True)
                reaction.save()
            return Response(status=status.HTTP_200_OK)
        
class UndislikePostView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            post = Post.objects.get(id=id)
            post.dislikes -= 1
            post.save()
            if React.objects.filter(user=request.user, post=post).exists():
                reaction = React.objects.get(user=request.user, post=post)
                reaction.dislike = False
                reaction.save()
            else:
                reaction = React.objects.create(user=request.user, post=post, dislike=False)
                reaction.save()
            return Response(status=status.HTTP_200_OK)

# Comments view functions here
class CreateCommentView(APIView):
    serializer_class = CommentSerializer
    
    def post(self, request, id):
        serializer_class = self.serializer_class(data=request.data)
        if serializer_class.is_valid():
            body = serializer_class.data.get('body')
            author = request.user
            # post = self.context['request'].parser_context['kwargs']['id']
            post = Post.objects.get(id=id)
            reply_id = None if request.data["reply_id"] == "undefined" else request.data["reply_id"]
            if reply_id is not None:
                parent = Comment.objects.get(id=reply_id)
                comment = Comment.objects.create(body=body, author=author, post=post, parent=parent)
            else:
                comment = Comment.objects.create(body=body, author=author, post=post)
            
            comment.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

class GetCommentsView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            post = Post.objects.get(id=id)
            comments = Comment.objects.filter(post=post).order_by('-time_posted').values()
            for comment in comments:
                comment['author'] = User.objects.get(id=comment['author_id']).username
                if comment['parent_id']:
                    parent = Comment.objects.get(id=comment['parent_id'])
                    comment['reply_author'] = parent.author.username
                    comment['reply_body'] = parent.body
            return Response({'comments_data': comments}, status=status.HTTP_200_OK)

class EditCommentView(APIView):
    serializer_class = CommentSerializer

    def put(self, request, id):
        serializer_class = self.serializer_class(data=request.data)
        instance = Comment.objects.get(id=id)
        if id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            if serializer_class.is_valid():
                # instance.body = validated_data.get('body', instance.body)
                instance.body = serializer_class.data.get("body")
                instance.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class DeleteCommentView(APIView):
    def delete(self, request, id):
        instance = Comment.objects.get(id=id)
        if instance is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            Comment.objects.filter(id=id).delete()
            return Response(status=status.HTTP_200_OK)
        
class ReplyCommentView(APIView):
    def post(self, request, id):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            parent_comment = Comment.objects.get(pk=id)
            body = serializer.data.get('body')
            author = request.user
            post = parent_comment.post
            comment = Comment.objects.create(body=body, author=author, post=post, parent=parent_comment)
            
            comment.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

class LikeDislikeCommentView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            comment = Comment.objects.get(id=id)
            print(CommentReact.objects.filter(user=request.user, comment=comment).exists())
            if CommentReact.objects.filter(user=request.user, comment=comment).exists():
                reaction = CommentReact.objects.get(user=request.user, comment=comment)
                return Response({'like_status':reaction.like, 'dislike_status':reaction.dislike}, status=status.HTTP_200_OK)
            else:
                return Response({'like_status':False, 'dislike_status':False}, status=status.HTTP_200_OK)

class LikeCommentView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            comment = Comment.objects.get(id=id)
            comment.likes += 1
            comment.save()
            if CommentReact.objects.filter(user=request.user, comment=comment).exists():
                reaction = CommentReact.objects.get(user=request.user, comment=comment)
                reaction.like = True
                reaction.save()
            else:
                reaction = CommentReact.objects.create(user=request.user, comment=comment, like=True)
                reaction.save()                
            return Response(status=status.HTTP_200_OK)

class UnlikeCommentView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            comment = Comment.objects.get(id=id)
            comment.likes -= 1
            comment.save()
            if CommentReact.objects.filter(user=request.user, comment=comment).exists():
                reaction = CommentReact.objects.get(user=request.user, comment=comment)
                reaction.like = False
                reaction.save()
            else:
                reaction = CommentReact.objects.create(user=request.user, comment=comment, like=False)
                reaction.save()
            return Response(status=status.HTTP_200_OK)

class DislikeCommentView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            comment = Comment.objects.get(id=id)
            comment.dislikes += 1
            comment.save()
            if CommentReact.objects.filter(user=request.user, comment=comment).exists():
                reaction = CommentReact.objects.get(user=request.user, comment=comment)
                reaction.dislike = True
                reaction.save()
            else:
                reaction = CommentReact.objects.create(user=request.user, comment=comment, dislike=True)
                reaction.save()
            return Response(status=status.HTTP_200_OK)
        
class UndislikeCommentView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            comment = Comment.objects.get(id=id)
            comment.dislikes -= 1
            comment.save()
            if CommentReact.objects.filter(user=request.user, comment=comment).exists():
                reaction = CommentReact.objects.get(user=request.user, comment=comment)
                reaction.dislike = False
                reaction.save()
            else:
                reaction = CommentReact.objects.create(user=request.user, comment=comment, dislike=False)
                reaction.save()
            return Response(status=status.HTTP_200_OK)



        
# this is a potential way to get comment threads
class GetCommentThreadsView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        root_comments = Comment.objects.filter(post_id=id,parent=None).order_by('-timestamp').values()
        def get_replies(comment):
            replies = Comment.objects.filter(parent=comment).order_by('-timestamp').values()
            return replies
        comment_threads = []
        for comment in root_comments:
            comment['replies'] = get_replies(comment)
            comment_threads.append(comment)
        return Response({'comment_data': comment_threads}, status=status.HTTP_200_OK)
    