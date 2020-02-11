# user_management/test/test_config.py

import unittest

from flask import current_app
from flask_testing import TestCase

from src import app, const

class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object(const.Constant.APP_SETTINGS)
        return app

    def test_app_is_development(self):
        self.assertFalse(app.config['SECRET_KEY'] is 'my_secret_key')
        self.assertTrue(app.config['DEBUG'] is True)
        self.assertFalse(current_app is None)
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] == 'postgresql://postgres:1234@localhost/user_management'
        )
        
if __name__ == '__main__':
    unittest.main()