from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from posts.models import Post, Comment
from posts.serializers import PostSerializer, CommentSerializer
from django.contrib.auth.models import User
from clubs.models import Club

class PostTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.club = Club.objects.create(name='Test Club', description='Test Description')
        self.post = Post.objects.create(title='Test Post', author=self.user, body='Test Body', club=self.club)

    def test_create_post_success(self):
        data = {
            'title': 'New Post',
            'body': 'New Body',
            'club': self.club.id
        }
        response = self.client.post(reverse('create-post'), data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_create_post_invalid_data(self):
        data = {
            'title': '',
            'body': '',
            'club': ''
        }
        response = self.client.post(reverse('create-post'), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_post_success(self):
        response = self.client.get(reverse('get-post', args=[self.post.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_post_not_found(self):
        response = self.client.get(reverse('get-post', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_edit_post_success(self):
        data = {
            'title': 'Updated Post',
            'body': 'Updated Body'
        }
        response = self.client.put(reverse('edit-post', args=[self.post.id]), data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_edit_post_invalid_data(self):
        data = {
            'title': '',
            'body': ''
        }
        response = self.client.put(reverse('edit-post', args=[self.post.id]), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_delete_post_success(self):
        response = self.client.delete(reverse('delete-post', args=[self.post.id]))
        self.assertEqual(response.status_code, 200)

    def test_delete_post_not_found(self):
        response = self.client.delete(reverse('delete-post', args=[999]))
        self.assertEqual(response.status_code, 404)

class CommentTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@email.com', 'password')
        self.post = Post.objects.create(title='Test Post', author=self.user, body='Test Body', club=self.club)

    def test_create_comment_success(self):
        data = {
            'body': 'Test Comment',
            'post': self.post.id
        }
        response = self.client.post(reverse('create-comment'), data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_create_comment_invalid_data(self):
        data = {
            'body': '',
            'post': ''
        }
        response = self.client.post(reverse('create-comment'), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_comment_success(self):
        comment = Comment.objects.create(post=self.post, author=self.user, body='Test Comment')
        response = self.client.get(reverse('get-comment', args=[comment.id]))
        self.assertEqual(response.status_code, 200)

    def test_get_comment_not_found(self):
        response = self.client.get(reverse('get-comment', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_edit_comment_success(self):
        comment = Comment.objects.create(post=self.post, author=self.user, body='Test Comment')
        data = {
            'body': 'Updated Comment'
        }
        response = self.client.put(reverse('edit-comment', args=[comment.id]), data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_edit_comment_invalid_data(self):
        comment = Comment.objects.create(post=self.post, author=self.user, body='Test Comment')
        data = {
            'body': ''
        }
        response = self.client.put(reverse('edit-comment', args=[comment.id]), data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_delete_comment_success(self):
        comment = Comment.objects.create(post=self.post, author=self.user, body='Test Comment')
        response = self.client.delete(reverse('delete-comment', args=[comment.id]))
        self.assertEqual(response.status_code, 200)

    def test_delete_comment_not_found(self):
        response = self.client.delete(reverse('delete-comment', args=[999]))
        self.assertEqual(response.status_code, 404)
