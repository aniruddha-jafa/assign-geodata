from django.test import TestCase

from django.contrib.auth import get_user_model

class CustomUserTestCase(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="test@email.com", password="test12345"
        )
        self.assertEqual(user.username, 'test@email.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)