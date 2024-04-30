from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from profile.models import Profile
from profile.serializers import UsernameSerializer, PasswordSerializer
from django.contrib.auth.models import User

class ProfileTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.profile = Profile.objects.create(user=self.user)

    def test_profile_view_authenticated(self):
        response = self.client.get(reverse('profile', args=['testuser']))
        self.assertEqual(response.status_code, 200)

    def test_profile_view_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse('profile', args=['testuser']))
        self.assertEqual(response.status_code, 401)

    def test_profile_view_nonexistent_user(self):
        response = self.client.get(reverse('profile', args=['nonexistent']))
        self.assertEqual(response.status_code, 404)

class EditUsernameTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.serializer_class = UsernameSerializer

    def test_edit_username_success(self):
        data = {'username': 'newusername'}
        serializer = self.serializer_class(data=data)
        self.assertTrue(serializer.is_valid())
        response = self.client.post(reverse('edit-username'), data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_edit_username_failure(self):
        data = {'username': 'testuser'}
        serializer = self.serializer_class(data=data)
        self.assertTrue(serializer.is_valid())
        response = self.client.post(reverse('edit-username'), data, format='json')
        self.assertEqual(response.status_code, 400)

class EditPasswordTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.serializer_class = PasswordSerializer

    def test_edit_password_success(self):
        data = {'password': 'newpassword'}
        serializer = self.serializer_class(data=data)
        self.assertTrue(serializer.is_valid())
        response = self.client.post(reverse('edit-password'), data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_edit_password_failure(self):
        data = {'password': ''}
        serializer = self.serializer_class(data=data)
        self.assertFalse(serializer.is_valid())
        response = self.client.post(reverse('edit-password'), data, format='json')
        self.assertEqual(response.status_code, 400)

class EditImageTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.profile = Profile.objects.create(user=self.user)

    def test_edit_image_success(self):
        data = {'image': 'image_data'}
        response = self.client.post(reverse('edit-image'), data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_edit_image_failure(self):
        data = {}
        response = self.client.post(reverse('edit-image'), data, format='json')
        self.assertEqual(response.status_code, 400)
