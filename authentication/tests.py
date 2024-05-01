from django.test import TestCase
from django.contrib.auth.models import User
from authentication.serializers import CreateUserSerializer

from django.test import TestCase, Client #for user login testcase


# User Registration Test cases:
# Test that a new user can register successfully.
# Test that registration fails if the username already exists.
# Test that registration fails if the data is invalid.

class RegistrationTestCase(TestCase):
    def test_successful_registration(self):
        data = {
            'username': 'test_user',
            'email': 'test@example.com',
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User'
        }
        serializer = CreateUserSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertEqual(User.objects.count(), 1)

    def test_registration_with_existing_username(self):
        # Create a user with the same username
        User.objects.create_user(username='test_user', email='test@example.com', password='testpassword')
        data = {
            'username': 'test_user',
            'email': 'another_test@example.com',
            'password': 'anotherpassword',
            'first_name': 'Another',
            'last_name': 'User'
        }
        serializer = CreateUserSerializer(data=data)
        self.assertFalse(serializer.is_valid())



# User Login Test cases:
 
class LoginTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', email='test@example.com', password='testpassword')

    def test_successful_login(self):
        client = Client()
        response = client.post('/login/', {'username': 'test_user', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)

    def test_login_with_incorrect_credentials(self):
        client = Client()
        response = client.post('/login/', {'username': 'test_user', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 401)

    def test_login_with_nonexistent_username(self):
        client = Client()
        response = client.post('/login/', {'username': 'nonexistent_user', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 401)


    def test_login_with_incorrect_password(self):
        client = Client()
        response = client.post('/login/', {'username': 'test_user', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 401)

    def test_login_with_empty_password(self):
        client = Client()
        response = client.post('/login/', {'username': 'test_user', 'password': ''})
        self.assertEqual(response.status_code, 401)

    def test_login_with_empty_username(self):
        client = Client()
        response = client.post('/login/', {'username': '', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 401)

    def test_login_with_inactive_user(self):
        # Deactivate the user
        self.user.is_active = False
        self.user.save()

        client = Client()
        response = client.post('/login/', {'username': 'test_user', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 401)




# User Logout Test Case:
# Test that a logged-in user can log out successfully.

class LogoutTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', email='test@example.com', password='testpassword')

    def test_successful_logout(self):
        client = Client()
        client.login(username='test_user', password='testpassword')
        response = client.get('/logout/')
        self.assertEqual(response.status_code, 200)


# Check Authentication Status Test Case:
# Test that the endpoint for checking authentication status behaves as expected.

class CheckAuthTestCase(TestCase):
    def test_authenticated_user(self):
        client = Client()
        # Assuming the '/check-auth/' endpoint exists
        response = client.get('/check-auth/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'authenticated': True})
