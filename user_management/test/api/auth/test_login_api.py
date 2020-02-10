# user_management/test/api/auth/test_login_api.py

import unittest
import json

from test.base import BaseTestCase
from test.helper import Helper


class TestLoginAPIBlueprint(BaseTestCase):
    
    def test_registered_user_login(self):
        """ Test for login of registered-user login """
            
        # user registration
        register_response = Helper.user_registration_helper('test', 
                                                            'test@test.com', 
                                                            'test')
        register_data = json.loads(register_response.data.decode())
        self.assertTrue(register_data['status'] == 'success')
        self.assertTrue(
            register_data['message'] == 'User successfully registered.'
        )
        self.assertTrue(register_data['auth_token'])
        self.assertTrue(register_response.content_type == 'application/json')
        self.assertEqual(register_response.status_code, 201)
        
        # registered user login
        login_response = Helper.user_login_helper('test', 
                                                  'test')
        login_data = json.loads(login_response.data.decode())
        self.assertTrue(login_data['status'] == 'success')
        self.assertTrue(login_data['message'] == 'Login successful.')
        self.assertTrue(login_data['auth_token'])
        self.assertTrue(login_response.content_type == 'application/json')
        self.assertEqual(login_response.status_code, 200)
            
    
if __name__ == '__main__':
    unittest.main()