import datetime
from django.db import models

from clubs.models import Club
# Create your models here.

from django.contrib.auth.models import User



class Event(models.Model):
    title = models.CharField(max_length=128)
    body = models.TextField()
    event_date = models.DateField()
    event_time = models.TimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    attendees = models.IntegerField(default=0)
    time_posted = models.DateTimeField(default=datetime.datetime.now)

class EventReact(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)

class EventAttending(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    attending = models.BooleanField(default=False)

    
