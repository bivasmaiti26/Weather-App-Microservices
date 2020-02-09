# user_management/src/Const.py

class Constant:
    DATABASE_BASE_URL = 'postgresql://postgres:1234@localhost/'
    DATABASE_NAME = 'user_management'
    APP_SETTINGS = 'user_management.src.config.DevelopmentConfig'
    APP_SETTINGS_TEST = 'user_management.src.config.TestConfig'
    JWT_TOKEN_EXP_DAY_HR_MIN_SEC = '00:00:00:05'
    
    
    