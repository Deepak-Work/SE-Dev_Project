from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
from rest_framework import status

from django.contrib.auth.models import User

from clubs.models import Club
from .models import Event, EventReact, EventAttending
from .serializers import EventSerializer
from clubs.models import AuditLog
from datetime import datetime

class CreateEventView(APIView):
    serializer_class = EventSerializer
    
    def post(self, request, club_name, club_id):
        serializer_class = self.serializer_class(data=request.data)
        request.data['event_date'] = datetime.strptime(request.data['event_date'], '%m/%d/%Y').date()
        request.data['event_time'] = datetime.strptime(request.data['event_time'], '%I:%M %p')
        request.data['event_time'] = request.data['event_time'].strftime("%H:%M:%S")

        print(request.data)

        if serializer_class.is_valid():
            title = serializer_class.data.get('title')
            body = serializer_class.data.get('body')
            date = serializer_class.data.get('event_date')
            time = serializer_class.data.get('event_time')
            
            club = Club.objects.get(id=club_id)
            event = Event.objects.create(title=title, body=body, event_date=date, event_time=time, author=request.user, club=club)
            event.save()
            log = AuditLog.objects.create(club=club, action="Created", item="Event: " + title, user=request.user)
            log.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer_class.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class GetEventView(APIView):
    def get(self, request, id):
        event = Event.objects.filter(id=id).order_by('-time_posted').values()[0]
        event['author'] = User.objects.get(id=event['author_id']).username
        club = Club.objects.get(id=event['club_id'])
        event['club_name'] = club.name
        event['club_image'] = club.image.url
        event['total_RSVP'] = EventAttending.objects.filter(event=event['id']).count()
        del event['author_id']
        if event:
            return Response({'event_data': event}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class GetEventsView(APIView):
    def get(self, request, club_name, club_id):
        club = Club.objects.get(id=club_id)
        events = Event.objects.filter(club=club).order_by('-time_posted').values()
        for event in events:
            event['total_RSVP'] = EventAttending.objects.filter(event=event['id']).count()
        if events:
            return Response({'events_data': events}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class EditEventView(APIView):
    serializer_class = EventSerializer
    def put(self, request, id):
        serializer = self.serializer_class(data=request.data)
        request.data['event_date'] = datetime.strptime(request.data['event_date'], '%m/%d/%Y').date()
        request.data['event_time'] = datetime.strptime(request.data['event_time'], '%I:%M %p')
        request.data['event_time'] = request.data['event_time'].strftime("%H:%M:%S")
        
        if serializer.is_valid():
            event = Event.objects.get(id=id)
            event.title = serializer.data.get('title')
            event.body = serializer.data.get('body')
            event.event_date = serializer.data.get('event_date')
            event.event_time = serializer.data.get('event_time')
            event.save()
            log = AuditLog.objects.create(club=event.club, action="Edited", item="Event: " + event.name, user=request.user)
            log.save()
        else:
            print("Serializer invalid - Edit")
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        return Response(status=status.HTTP_201_CREATED)
    # def put(self, request, instance_id, validated_data):
    #     instance = Event.objects.get(id=instance_id)
    #     if id is None:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         instance.name = validated_data.get('name', instance.name)
    #         instance.description = validated_data.get('description', instance.description)
    #         instance.date = validated_data.get('date', instance.date)
    #         instance.time = validated_data.get('time', instance.time)
    #         instance.save()
    #         log = AuditLog.objects.create(club=instance.club, action="Edited", item="Event: " + instance.name, user=request.user)
    #         log.save()
    #         return Response(status=status.HTTP_200_OK)

class DeleteEventView(APIView):
    def delete(self, request, id):
        # id = self.context['request'].parser_context['kwargs'].get('id', None)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            clubid = Event.objects.get(id=id).club.id
            clubname = Club.objects.get(id=clubid).name
            event = Event.objects.get(id=id)
            print(event)
            event.delete()
            return Response({'club_name':clubname,'club_id':clubid},status=status.HTTP_200_OK)
    pass
    # def delete(self, request, instance_id):
    #     instance = Event.objects.get(id=instance_id)
    #     if id is None:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         Event.objects.filter(id=id).delete()
    #         log = AuditLog.objects.create(club=instance.club, action="Deleted", item="Event: " + instance.name, user=request.user)
    #         log.save()
    #         return Response(status=status.HTTP_200_OK)

class LikeDislikeEventView(APIView):
    def get(self, request, id):
        print(id, "id")
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            print(EventReact.objects.filter(user=request.user, event=event).exists())
            if EventReact.objects.filter(user=request.user, event=event).exists():
                reaction = EventReact.objects.get(user=request.user, event=event)
                return Response({'like_status':reaction.like, 'dislike_status':reaction.dislike}, status=status.HTTP_200_OK)
            else:
                return Response({'like_status':False, 'dislike_status':False}, status=status.HTTP_200_OK)

class LikeEventView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            event.likes += 1
            event.save()
            if EventReact.objects.filter(user=request.user, event=event).exists():
                reaction = EventReact.objects.get(user=request.user, event=event)
                reaction.like = True
                reaction.save()
            else:
                reaction = EventReact.objects.create(user=request.user, event=event, like=True)
                reaction.save()                
            return Response(status=status.HTTP_200_OK)

class UnlikeEventView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            event.likes -= 1
            event.save()
            if EventReact.objects.filter(user=request.user, event=event).exists():
                reaction = EventReact.objects.get(user=request.user, event=event)
                reaction.like = False
                reaction.save()
            else:
                reaction = EventReact.objects.create(user=request.user, event=event, like=False)
                reaction.save()
            return Response(status=status.HTTP_200_OK)

class DislikeEventView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            event.dislikes += 1
            event.save()
            if EventReact.objects.filter(user=request.user, event=event).exists():
                reaction = EventReact.objects.get(user=request.user, event=event)
                reaction.dislike = True
                reaction.save()
            else:
                reaction = EventReact.objects.create(user=request.user, event=event, dislike=True)
                reaction.save()
            return Response(status=status.HTTP_200_OK)
        
class UndislikeEventView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            event.dislikes -= 1
            event.save()
            if EventReact.objects.filter(user=request.user, event=event).exists():
                reaction = EventReact.objects.get(user=request.user, event=event)
                reaction.dislike = False
                reaction.save()
            else:
                reaction = EventReact.objects.create(user=request.user, event=event, dislike=False)
                reaction.save()
            return Response(status=status.HTTP_200_OK)
        
# RSVP
class AttendingEventView(APIView):
    def get(self, request, id):
        print(id, "id")
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            print(EventAttending.objects.filter(user=request.user, event=event).exists())
            if EventAttending.objects.filter(user=request.user, event=event).exists():
                attending_status = EventAttending.objects.get(user=request.user, event=event)
                return Response({'attending_status':attending_status.attending, }, status=status.HTTP_200_OK)
            else:
                 return Response({'attending_status': False }, status=status.HTTP_200_OK)

class AttendEventView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            event.attendees += 1
            event.save()
            if EventAttending.objects.filter(user=request.user, event=event).exists():
                event_attending = EventAttending.objects.get(user=request.user, event=event)
                event_attending.attending = True
                event_attending.save()
            else:
                event_attending = EventAttending.objects.create(user=request.user, event=event, attending=True)
                event_attending.save()
            return Response(status=status.HTTP_200_OK)
        
class UnattendEventView(APIView):
    def get(self, request, id):
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            event = Event.objects.get(id=id)
            event.attendees -= 1
            event.save()
            if EventAttending.objects.filter(user=request.user, event=event).exists():
                event_attending = EventAttending.objects.get(user=request.user, event=event)
                event_attending.attending = False
                event_attending.save()
            else:
                event_attending = EventAttending.objects.create(user=request.user, event=event, attending=False)
                event_attending.save()
            return Response(status=status.HTTP_200_OK)