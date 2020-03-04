# user_management/src/Const.py

class Constant:
    DATABASE_BASE_URL = 'postgresql://postgres@postgres/'
    DATABASE_NAME = 'user_management'
    APP_SETTINGS = 'src.config.DevelopmentConfig'
    APP_SETTINGS_TEST = 'src.config.TestConfig'
    JWT_TOKEN_EXP_DAY_HR_MIN_SEC = '00:00:30:00'
    HOST = 'localhost'
    PORT = '6000'
