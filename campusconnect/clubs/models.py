from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Club(models.Model):
    """
    Club - stores details of the club

    Name - stores name of the club
    Description - stores description of the club
    Location - stores location of the club
    Email - stores email of the club
    Contact - stores the phone number of the club
    Website - stores the URL linking to this clubs website
    Image - stores image of the club (NOTE: not implemented yet)
    Member_Count - stores number of members in the club
    Organizer - stores the user who created the club (foreign key to User model)
    """

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    location = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    contact = models.CharField(max_length=12, unique=True)
    website = models.URLField()
    # image = models.ImageField(upload_to='clubs', default="/clubs/CampusConnectLogo.svg")
    image = models.ImageField(upload_to='clubs')
    member_count = models.PositiveSmallIntegerField(default=1)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def clean(self):
        # TODO: Add validation here 
        pass

class Follow(models.Model):
    """
    Follows - stores the relationship between user and club

    User - stores the user who is following the club (foreign key to User model)
    Club - stores the club being followed (foreign key to Club model)
    """
    class Meta:
        # Build a composite primary key for the model
        unique_together = (('user', 'club'),)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    
    
class Role(models.Model):
    class Meta:
        # Build a composite primary key for the model
        unique_together = (('user', 'club'),)
    user = models.ForeignKey(User, on_delete=models.CASCADE) # this is the user who created the role
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    
class Membership(models.Model):
    class Meta:
        # Build a composite primary key for the model
        unique_together = (('user', 'club', 'role'),)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    

class AuditLog(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    action = models.CharField(max_length=100)
    item = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)