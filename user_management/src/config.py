# user_management/src/config.py

import os
from src.const import Constant as constant

class BaseConfig:
    """Base configuration."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret_key')
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = constant.DATABASE_BASE_URL + constant.DATABASE_NAME
    
class TestConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = constant.DATABASE_BASE_URL + constant.DATABASE_NAME + '_test'
    
