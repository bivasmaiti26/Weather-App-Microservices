# user_management/test/api/auth/test_register_api.py

import unittest
import json

from test import base
from test import helper

class TestRegisterAPIBlueprint(base.BaseTestCase):

    def test_register_new_user(self):
        """ Test for new user registration """
        with self.client:
            response = helper.Helper.user_registration_helper('test', 
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