import json
from rest_framework.response import Response

from django.shortcuts import render
from django.contrib.auth.models import User
from django.forms.models import model_to_dict

from rest_framework.views import APIView
from .models import Club, Follow, Role, Membership, AuditLog
from rest_framework import status

from posts.models import Post, Comment
from event.models import Event, EventAttending

from .serializers import ClubSerializer, RoleSerializer, MembershipSerializer

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
                        
            if clubImage:
                club = Club.objects.create(name=clubName, description=clubDesc, location=clubLoc, 
                                                email=clubEmail, contact=clubContact, website=clubWebsite, organizer=clubOrganizer, image=clubImage)
                club.save()
            else:
                club = Club.objects.create(name=clubName, description=clubDesc, location=clubLoc, 
                                                email=clubEmail, contact=clubContact, website=clubWebsite, organizer=clubOrganizer, image='clubs/CampusConnectLogo.svg')
                club.save()
            
            follow = Follow.objects.create(user=request.user, club=club)
            follow.save()
            
            role = Role.objects.create(user=request.user, club=club, role="member")
            role.save()
            
            log = AuditLog.objects.create(club=club, action="Created", item="Club: " + clubName ,user=request.user)
            # TODO - Should we immediately put the club organizer into Follows model?
            log.save()
            return Response({'club_id': str(club.id)}, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class GetClubView(APIView):
    def get(self, request, name, id):        
        c = Club.objects.get(id=id)
        c_json = model_to_dict(c)
        c_json['image'] = c.image.url

        followers = Follow.objects.filter(club_id=id)
        club_followers = [{"id": follower.user.id, "username": follower.user.username, "image":follower.user.profile.image.url} for follower in followers]

        c_json['followers'] = club_followers

        posts = Post.objects.filter(club=id).order_by('-time_posted').values()
        for post in posts:
            post_obj = Post.objects.get(id=post['id'])
            post['author'] = User.objects.get(id=post['author_id']).username
            post['clubname'] = name
            post['total_comments'] = Comment.objects.filter(post=post_obj).count()
            del post['author_id']
        
        events = Event.objects.filter(club=id).order_by('-time_posted').values()
        for event in events:
            event['total_RSVP'] = EventAttending.objects.filter(event=event['id']).count()
            event['author'] = User.objects.get(id=event['author_id']).username
            del event['author_id']

        if c:
            return Response({'club_data': c_json, 'posts': posts, 'events': events}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    
class GetFollowStatus(APIView):
    def get(self, request, name, id):
        club = Club.objects.get(id=id)
        if club is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            if Follow.objects.filter(user=request.user, club=club).exists():
                return Response({'follow_status': True}, status=status.HTTP_200_OK)
            else:
                return Response({'follow_status': False}, status=status.HTTP_200_OK)
            
            
class FollowClubView(APIView):
    def get(self, request, name, id):
        club = Club.objects.get(id=id)
        if club is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            follows = Follow.objects.create(user=request.user, club=club)
            follows.save()
            followsCount = Follow.objects.filter(club=club).count()
            club.member_count = followsCount
            club.save()
            return Response(status=status.HTTP_200_OK)

class UnfollowClubView(APIView):
    def get(self, request, name, id):
        club = Club.objects.get(id=id)
        if club is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            Follow.objects.filter(user=request.user, club=club).delete()
            followsCount = Follow.objects.filter(club=club).count()
            club.member_count = followsCount
            club.save()
            return Response(status=status.HTTP_200_OK)
        
class GetFollowersView(APIView):
    def get(self, request, id):
        followers = Follow.objects.filter(club=id).values()
        print(followers)
        return Response(status=status.HTTP_404_NOT_FOUND)
          
class GetClubsView(APIView):
    def get(self, request):
        # TODO: Eventually, we'll also have to include events and members associated with this club
        clubs = Club.objects.all().values()
        if clubs:
            return Response({'clubs_data': clubs}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class GetFollowedClubsView(APIView):
    def get(self, request):
        follows = Follow.objects.filter(user=request.user).values("club_id")
        clubs = [Club.objects.filter(id=f['club_id']).values()[0] for f in follows]
        clubs_id = [f['club_id'] for f in follows.values()]
        if clubs and len(clubs) > 0:
            return Response({'clubs_data' : clubs, "clubs_id": clubs_id}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class GetExploreClubsView(APIView):
    def get(self, request):
        clubs = Club.objects.all().values("id", "name", "member_count", "image")
        clubs_res = []
        for c in clubs:
            clubs_json = json.loads(json.dumps(c))
            clubs_res.append(clubs_json)
        if clubs_res:
            return Response({'clubs_data' : clubs}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class GetMyClubsView(APIView):
    def get(self, request):
        clubs = Follow.objects.filter(user=request.user).values("id", "name", "member_count", "image")
        if clubs:
            return Response({'clubs_data' : clubs}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class GetMyEventsView(APIView):
    def get(self, request):
        followed_clubs = Follow.objects.filter(user=request.user).values_list('club', flat=True)
        events = Event.objects.filter(club__in=followed_clubs)

        events_res = []

        for e in events:
            events_res.append({'club': e.club.name, 'name': e.name, 'description': e.description, 'event_date': e.event_date, \
                               'event_time': e.event_time, 'author': e.author.username, 'club': e.club.name, 'likes': e.likes, 'dislikes': e.dislikes, 'time_posted': e.time_posted})


        return Response({'event_data': events_res}, status=status.HTTP_200_OK)


class ToggleFollowClubView(APIView):
    def get(self, request, id):
        club = Club.objects.get(id=id)
        if club is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            Follow.objects.filter(user=request.user, club=club).delete()
            return Response(status=status.HTTP_200_OK)
            
            

class AddRoleView(APIView):
    serializer = RoleSerializer
    def get(self, request, id):
        serializer_data = self.serializer_class(data=request.data)
        if serializer_data.is_valid():
            club = Club.objects.get(id=id)
            if club is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                role = Role.objects.create(user=request.user, club=club, role=serializer_data.data.get('role'))
                role.save()
                return Response(status=status.HTTP_200_OK)
            
class RemoveRoleView(APIView):
    serializer = RoleSerializer
    def get(self, request, id):
        serializer_data = self.serializer_class(data=request.data)
        if serializer_data.is_valid():
            club = Club.objects.get(id=id)
            # I would like any member in the club with a admin role to be able to delete the role
            if club is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                Role.objects.filter(user=request.user, club=club, role=serializer_data.data.get('role')).delete()
                return Response(status=status.HTTP_200_OK)
            
class GetRoleView(APIView):
    def get(self, request, id):
        roles = Role.objects.filter(club=id).values()
        if roles:
            return Response({'roles_data' : roles}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    


class AssignRoleView(APIView):
    serializer = MembershipSerializer
    def get(self, request, id):
        serializer_data = self.serializer_class(data=request.data)
        if serializer_data.is_valid():
            club = Club.objects.get(id=id)
            if club is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                user = request.user
                role = Role.objects.get(user=user, club=club, role=serializer_data.data.get('role'))
                if role is None:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                else:
                    membership = Membership.objects.create(user=user, club=club, role=role)
                    membership.save()
                    return Response(status=status.HTTP_200_OK)


class RemoveMembershipView(APIView):
    def get(self, request, id):
        membership = Membership.objects.get(id=id)
        if membership is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            membership.delete()
            return Response(status=status.HTTP_200_OK)
        
class GetMembershipView(APIView):
    def get(self, request, id):
        memberships = Membership.objects.filter(user=request.user, club=id).values()
        # this is to view the roles of a user in a club
        
        if memberships:
            return Response({'memberships_data' : memberships}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
