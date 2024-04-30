from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from events.models import Event
from events.serializers import EventSerializer
from django.contrib.auth.models import User

class EventTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.event = Event.objects.create(name='Test Event', description='Test Description', date='2024-04-29', time='14:30:00', user=self.user)

    def test_create_event_success(self):
        data = {
            'name': 'New Event',
            'description': 'New Description',
            'date': '2024-04-30',
            'time': '15:30:00'
        }
        response = self.client.post(reverse('create-event'), data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_create_event_invalid_data(self):
        data = {
            'name': '',
            'description': '',
            'date': '',
            'time': ''
        }
        response = self.client.post(reverse('create-event'), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_event_success(self):
        response = self.client.get(reverse('get-event', args=[self.event.name, self.event.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_event_not_found(self):
        response = self.client.get(reverse('get-event', args=['Unknown Event', 999]))
        self.assertEqual(response.status_code, 404)

    def test_edit_event_success(self):
        data = {
            'name': 'Updated Event',
            'description': 'Updated Description',
            'date': '2024-05-01',
            'time': '16:30:00'
        }
        response = self.client.put(reverse('edit-event', args=[self.event.id]), data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_edit_event_invalid_data(self):
        data = {
            'name': '',
            'description': '',
            'date': '',
            'time': ''
        }
        response = self.client.put(reverse('edit-event', args=[self.event.id]), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_delete_event_success(self):
        response = self.client.delete(reverse('delete-event', args=[self.event.id]))
        self.assertEqual(response.status_code, 200)

    def test_delete_event_not_found(self):
        response = self.client.delete(reverse('delete-event', args=[999]))
        self.assertEqual(response.status_code, 400)

    def test_rsvp_event_success(self):
        response = self.client.post(reverse('rsvp-event', args=[self.event.id]))
        self.assertEqual(response.status_code, 201)

    def test_rsvp_event_already_rsvped(self):
        self.client.post(reverse('rsvp-event', args=[self.event.id]))
        response = self.client.post(reverse('rsvp-event', args=[self.event.id]))
        self.assertEqual(response.status_code, 400)

    def test_rsvp_event_not_found(self):
        response = self.client.post(reverse('rsvp-event', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_unrsvp_event_success(self):
        self.client.post(reverse('rsvp-event', args=[self.event.id]))
        response = self.client.delete(reverse('rsvp-event', args=[self.event.id]))
        self.assertEqual(response.status_code, 200)

    def test_unrsvp_event_not_rsvped(self):
        response = self.client.delete(reverse('rsvp-event', args=[self.event.id]))
        self.assertEqual(response.status_code, 400)

    def test_get_rsvp_status_success(self):
        self.client.post(reverse('rsvp-event', args=[self.event.id]))
        response = self.client.get(reverse('get-rsvp-status', args=[self.event.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_rsvp_status_not_rsvped(self):
        response = self.client.get(reverse('get-rsvp-status', args=[self.event.id]))
        self.assertEqual(response.status_code, 200)