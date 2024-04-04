from rest_framework.response import Response

from django.shortcuts import render
from django.contrib.auth.models import User
from django.forms.models import model_to_dict

from rest_framework.views import APIView
from .models import Club
from rest_framework import status

from posts.models import Post
from .models import Club

from .serializers import ClubSerializer

# Create your views here.
class CreateClubView(APIView):
    serializer_class = ClubSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            clubName = serializer.data.get('name')
            clubDesc = serializer.data.get('description')
            clubLoc = serializer.data.get('location')
            clubEmail = serializer.data.get('email')
            clubContact = serializer.data.get('contact')
            clubWebsite = serializer.data.get('website')
            clubImage = request.data['image']
            clubOrganizer = request.user

            queryset = Club.objects.filter(name=clubName)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
                        
            # TODO - Should we immediately put the club organizer into Follows model?
            
            
            club = Club.objects.create(name=clubName, description=clubDesc, location=clubLoc, 
                                            email=clubEmail, contact=clubContact, website=clubWebsite, organizer=clubOrganizer, image=clubImage)
            club.save()

            
            
            return Response({'club_id': str(club.id)}, status=status.HTTP_201_CREATED)
        
        # 
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class GetClubView(APIView):
    def get(self, request, name, id):
        # TODO: Eventually, we'll also have to include events and members associated with this club
        
        c = Club.objects.get(id=id)
        c_json = model_to_dict(c)
        c_json['image'] = c.image.url

        posts = Post.objects.filter(club=id).order_by('-time_posted').values()
        for post in posts:
            post['author'] = User.objects.get(id=post['author_id']).username
            del post['author_id']
        if c:
            return Response({'club_data': c_json, 'posts': posts}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

            
            