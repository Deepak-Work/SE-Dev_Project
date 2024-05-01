from django.contrib import admin
from .models import Event, EventReact, EventAttending
# Register your models here.

admin.site.register(Event)
admin.site.register(EventReact)
admin.site.register((EventAttending))