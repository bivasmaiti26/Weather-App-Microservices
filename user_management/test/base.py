# user_management/test/base.py

from flask_testing import TestCase

from src.const import Constant
from src import app, db

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

class BaseTestCase(TestCase):
    """ Base test cases """
    
    def create_app(self):
        app.config.from_object(Constant.APP_SETTINGS_TEST)
        return app
    
    def setUp(self):
        db_engine = create_engine(Constant.DATABASE_BASE_URL + Constant.DATABASE_NAME + '_test')
        if not database_exists(db_engine.url):
            create_database(db_engine.url)
        
        from src.model.user_model import User
        db.create_all()
        db.session.commit()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
