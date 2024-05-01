from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from clubs.models import Club, Follow
from django.contrib.auth.models import User

class ClubTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.club = Club.objects.create(name='Test Club', description='Test Description', location='Test Location', email='test@email.com', contact='1234567890', website='(link unavailable)', image='test_image.jpg', organizer=self.user)

    def test_create_club_success(self):
        data = {
            'name': 'New Club',
            'description': 'New Description',
            'location': 'New Location',
            'email': 'new@email.com',
            'contact': '9876543210',
            'website': '(link unavailable)',
            'image': 'new_image.jpg'
        }
        response = self.client.post(reverse('create-club'), data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_create_club_invalid_data(self):
        data = {
            'name': '',
            'description': '',
            'location': '',
            'email': '',
            'contact': '',
            'website': '',
            'image': ''
        }
        response = self.client.post(reverse('create-club'), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_create_club_existing_name(self):
        data = {
            'name': 'Test Club',
            'description': 'New Description',
            'location': 'New Location',
            'email': 'new@email.com',
            'contact': '9876543210',
            'website': '(link unavailable)',
            'image': 'new_image.jpg'
        }
        response = self.client.post(reverse('create-club'), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_club_success(self):
        response = self.client.get(reverse('get-club', args=[self.club.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_club_not_found(self):
        response = self.client.get(reverse('get-club', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_get_club_invalid_id(self):
        response = self.client.get(reverse('get-club', args=['abc']))
        self.assertEqual(response.status_code, 400)

    def test_follow_club_success(self):
        response = self.client.get(reverse('follow-club', args=[self.club.id]))
        self.assertEqual(response.status_code, 200)

    def test_follow_club_already_following(self):
        Follow.objects.create(user=self.user, club=self.club)
        response = self.client.get(reverse('follow-club', args=[self.club.id]))
        self.assertEqual(response.status_code, 400)

    def test_follow_club_not_found(self):
        response = self.client.get(reverse('follow-club', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_unfollow_club_success(self):
        Follow.objects.create(user=self.user, club=self.club)
        response = self.client.get(reverse('unfollow-club', args=[self.club.id]))
        self.assertEqual(response.status_code, 200)

    def test_unfollow_club_not_following(self):
        response = self.client.get(reverse('unfollow-club', args=[self.club.id]))
        self.assertEqual(response.status_code, 400)

    def test_unfollow_club_not_found(self):
        response = self.client.get(reverse('unfollow-club', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_get_follow_status_success(self):
        response = self.client.get(reverse('get-follow-status', args=[self.club.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_follow_status_not_found(self):
        response = self.client.get(reverse('get-follow-status', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_get_clubs_success(self):
        response = self.client.get(reverse('get-clubs'))
        self.assertEqual(response.status_code, 200)

    def test_get_clubs_no_clubs(self):
        Club.objects.all().delete()
        response = self.client.get(reverse('get-clubs'))
        self.assertEqual(response.status_code, 200)

    def test_get_followed_clubs_success(self):
        Follow.objects.create(user=self.user, club=self.club)
        response = self.client.get(reverse('get-followed-clubs'))
        self.assertEqual(response.status_code, 200)

    def test_get_followed_clubs_no_followed_clubs(self):
        response = self.client.get(reverse('get-followed-clubs'))
        self.assertEqual(response.status_code, 200)

    def test_toggle_follow_club_success(self):
        response = self.client.get(reverse('toggle-follow-club', args=[self.club.id]))
        self.assertEqual(response.status_code, 200)

    def test_toggle_follow_club_not_found(self):
        response = self.client.get(reverse('toggle-follow-club', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_get_follow_status_success(self):
        response = self.client.get(reverse('get-follow-status', args=[self.club.name, self.club.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_follow_status_not_found(self):
        response = self.client.get(reverse('get-follow-status', args=['Unknown Club', 999]))
        self.assertEqual(response.status_code, 404)

    def test_get_explore_clubs_success(self):
         response = self.client.get(reverse('get-explore-clubs'))
         self.assertEqual(response.status_code, 200)

    def test_get_followed_clubs_success(self):
        Follow.objects.create(user=self.user, club=self.club)
        response = self.client.get(reverse('get-followed-clubs'))
        self.assertEqual(response.status_code, 200)
