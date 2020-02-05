# user-management/config/config.py

from const import Constant as constant

class BaseConfig:
    """Base configuration."""
    SECRET_KEY = constant.SECRET_KEY
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = constant.DATABASE_BASE_URL + constant.DATABASE_NAME
    
