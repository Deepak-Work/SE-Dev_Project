# Generated by Django 5.0 on 2024-03-27 23:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clubs', '0006_club_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='club',
            name='image',
        ),
    ]
