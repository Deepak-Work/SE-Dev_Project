from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Club
from rest_framework import status

from .models import Club

from .serializers import ClubSerializer

# Create your views here.
class CreateClubView(APIView):
    serilizer_class = ClubSerializer
    
    def post(self, request):
        serializer = self.serilizer_class(data=request.data)

        print(request.user.is_authenticated)
        
        if serializer.is_valid():

            clubName = serializer.data.get('name')
            clubDesc = serializer.data.get('description')
            clubLoc = serializer.data.get('location')
            clubEmail = serializer.data.get('email')
            clubContact = serializer.data.get('contact')
            clubWebsite = serializer.data.get('website')
            clubOrganizer = request.session['id']
                        
            queryset = Club.objects.filter(name=clubName)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
                        
            # TODO - Should we immediately put the club organizer into Follows model?
            
            club = Club.objects.create(name=clubName, description=clubDesc, location=clubLoc, 
                                            email=clubEmail, contact=clubContact, website=clubWebsite, organizer=clubOrganizer)
            club.save()

            
            
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class GetClubView(APIView):
    def get(self, request, name, id):
        # TODO: Eventually, we'll also have to include posts, events, and members associated with this club
        c = Club.objects.filter(name=name, id=id).values().first()
        return Response(c)

            
            