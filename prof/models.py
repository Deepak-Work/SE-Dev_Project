from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='prof', default='prof/default-pfp.png', blank=True, null=True)
    is_verified = models.BooleanField(default=False)