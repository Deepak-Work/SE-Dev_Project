from django.db import models

# Create your models here.
class Club(models.Model):
    club_name = models.CharField(max_length=100, unique=True)
    club_description = models.TextField()
    club_location = models.CharField(max_length=100)
    club_email = models.EmailField(unique=True)
    club_contact = models.IntegerField()
    club_website = models.URLField()
    club_image = models.ImageField()
    club_member = models.PositiveSmallIntegerField()
    club_organizer = models.PositiveSmallIntegerField()
    
    def clean(self):
        # TODO: Add validation here 
        pass