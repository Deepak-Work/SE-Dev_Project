# Generated by Django 5.0.2 on 2024-03-27 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clubs', '0002_club_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='image',
            field=models.FileField(upload_to=''),
        ),
    ]
