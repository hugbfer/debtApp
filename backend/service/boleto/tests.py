from django.test import TestCase
from rest_framework.test import APIClient

class GetUsersDebtsTest(TestCase):


    def test_get_debts_success(self):
        client = APIClient()

        data = {
            'upload_id':'1',
            'page': '0',
            'rows': '10',
        }

        response = client.get('/boleto/list-debts/', data)
        
        self.assertEqual(response.status_code, 200)

        self.assertIn('pagination', response.data)
        self.assertIn('data', response.data)

    def test_get_debts_missing_params(self):
        client = APIClient()

        response = client.get('/boleto/list-debts/')
       
        self.assertEqual(response.status_code, 400)


    def test_get_debts_pagination(self):
        client = APIClient()

        data = {
            'email': 'test@example.com',
            'governmentId': '123456789',
            'upload_id': '1',
            'page': '1',  
            'rows': '10',
        }


        response = client.get('/boleto/list-debts/', data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('pagination', response.data)
        self.assertIn('data', response.data)

    def test_get_debts_no_results(self):
        client = APIClient()

        data = {
            'email': 'nonexistent@example.com',
            'governmentId': '987654321',
            'upload_id': '999',
            'page': '0',
            'rows': '10',
        }

        response = client.get('/boleto/list-debts/', data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('pagination', response.data)
        self.assertIn('data', response.data)
        self.assertEqual(response.data['pagination']['count'], 0)