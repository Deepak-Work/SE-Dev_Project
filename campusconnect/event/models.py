import datetime
from django.db import models
import pytz

from clubs.models import Club
# Create your models here.

from django.contrib.auth.models import User



class Event(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    event_date = models.DateField()
    event_time = models.TimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    time_posted = models.DateTimeField(default=datetime.datetime.now)
    
