from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Club
from rest_framework import status

from .serializers import ClubSerializer

# Create your views here.
class CreateClubView(APIView):
    serilizer_class = ClubSerializer
    
    def post(self, request):
        serializer = self.serilizer_class(data=request.data)
        
        if serializer.is_valid():
            clubName = serializer.data.get('name')
            clubDesc = serializer.data.get('description')
            clubLoc = serializer.data.get('location')
            clubEmail = serializer.data.get('email')
            clubContact = serializer.data.get('contact')
            clubWebsite = serializer.data.get('website')
            clubOrganizer = serializer.data.get('organizer')
            
            queryset = Club.objects.filter(club_name=clubName)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            # TODO - Should we immediately put the club organizer into Follows model?
            
            club = Club.objects.create_club(club_name=clubName, club_description=clubDesc, club_location=clubLoc, 
                                            club_email=clubEmail, club_contact=clubContact, club_website=clubWebsite, club_organizer=clubOrganizer)
            club.save()
            
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
            
            