from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
from rest_framework import status
from .models import Event
from .serializers import EventSerializer

from datetime import datetime

class CreateEventView(APIView):
    serializer_class = EventSerializer
    
    def post(self, request):
        serializer_class = self.serializer_class(data=request.data)
        request.data['event_date'] = datetime.strptime(request.data['event_date'], '%m/%d/%Y').date()
        
        request.data['event_time'] = datetime.strptime(request.data['event_time'], '%I:%M %p')
        request.data['event_time'] = request.data['event_time'].strftime("%H:%M:%S")

        print(request.data) 
        if serializer_class.is_valid():
            name = serializer_class.data.get('name')
            description = serializer_class.data.get('description')
            date = serializer_class.data.get('event_date')
            time = serializer_class.data.get('event_time')
            event = Event.objects.create(name=name, description=description, event_date=date, event_time=time, user=request.user)
            event.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer_class.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class GetEventView(APIView):
    serializer_class = EventSerializer
    def get(self, request, name, id):
        c = Event.objects.filter(name=name, id=id).values().first()
        if c:
            return Response({'event_data': c}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class EditEventView(APIView):
    serializer_class = EventSerializer
    def put(self, request, instance_id, validated_data):
        instance = Event.objects.get(id=instance_id)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            instance.name = validated_data.get('name', instance.name)
            instance.description = validated_data.get('description', instance.description)
            instance.date = validated_data.get('date', instance.date)
            instance.time = validated_data.get('time', instance.time)
            instance.save()
            return Response(status=status.HTTP_200_OK)

class DeleteEventView(APIView):
    def delete(self, request, instance_id):
        instance = Event.objects.get(id=instance_id)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            Event.objects.filter(id=id).delete()
            return Response(status=status.HTTP_200_OK)