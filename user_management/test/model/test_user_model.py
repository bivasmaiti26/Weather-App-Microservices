# user_management/test/model/test_user_model.py

import unittest

from src import db
from src.model.user_model import User

from test.base import BaseTestCase

class TestUserModel(BaseTestCase):
    
    def test_generate_token(self):
        user = User(
            username='test',
            email='test@test.com',
            password='test_password'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.generate_token()
        self.assertTrue(isinstance(auth_token, bytes))
        
    def test_validate_token(self):
        user = User(
            username='test1',
            email='test1@test.com',
            password='test_password'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.generate_token()
        self.assertTrue(isinstance(auth_token, bytes))
        self.assertTrue(User.validate_token(
            auth_token.decode("utf-8")) == ('test1', False))
        
if __name__ == '__main__':
    unittest.main()
