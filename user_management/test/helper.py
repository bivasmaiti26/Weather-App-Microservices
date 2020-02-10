# user_management/test/helper.py

import json

from src import app

class Helper:
    client = app.test_client()
    
    @staticmethod
    def user_registration_helper(username, email, password):
        return Helper.client.post('/auth/register',
                                  data=json.dumps(dict(username=username,
                                                       email=email,
                                                       password=password)),
                                  content_type='application/json')
    
    @staticmethod                
    def user_login_helper(username, email, password):
        return Helper.client.post('/auth/login',
                                  data=json.dumps(dict(username=username,
                                                       password=password)),
                                  content_type='application/json')
                                  
                                  
    @staticmethod
    def user_details_helper(token):
        return Helper.client.get('/auth/user_details',
                                 headers=dict( Authorization='Bearer ' + token))