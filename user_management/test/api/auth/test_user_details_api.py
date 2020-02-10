# user_management/test/api/auth/test_user_details_api.py

import unittest
import json

import test.base.BaseTestCase as base
import test.helper.Helper as helper

class TestUserDetailsAPIBlueprint(base):
    
    def test_user_details(self):
        """ Test for user details """
        register_response = helper.user_registration_helper('test', 
                                                                  'test@test.com', 
                                                                  'test') 
        token = json.loads(register_response.data.decode())['auth_token']
        user_details_response = helper.user_details_helper(token)
        data = json.loads(user_details_response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['data'] is not None)
        self.assertTrue(data['data']['username'] == 'test')
        self.assertTrue(data['data']['email'] == 'test@test.com')
        self.assertTrue(data['data']['is_admin'] is 'true' or 'false')
        self.assertEqual(user_details_response.status_code, 200)
    
if __name__ == '__main__':
    unittest.main()