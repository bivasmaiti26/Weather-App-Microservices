# user_management/test/api/auth/test_register_api.py

import unittest
import json

from user_management.test import base

class TestRegisterAPIBlueprint(base.BaseTestCase):
    
    def register_user(self, username, email, password):
            return self.client.post(
                '/auth/register',
                data=json.dumps(dict(
                    username=username,
                    email=email,
                    password=password
                )),
                content_type='application/json',
            )
                
    def test_register_new_user(self):
        """ Test for new user registration """
        with self.client:
            response = self.register_user('test', 
                                          'test@gmail.com', 
                                          'test_password')
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'User successfully registered.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 201)
            
    def test_register_existing_user(self):
        """ Test for existing user registration """
        pass
    
if __name__ == '__main__':
    unittest.main()