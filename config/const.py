# user-management/config/Const.py

import random
import string

class Constant:
    chars = string.ascii_lowercase + string.ascii_uppercase + string.ascii_letters + string.digits + string.punctuation
    SECRET_KEY = ''.join(random.choice(chars) for i in range(24))
    DATABASE_BASE_URL = 'postgresql://postgres:1234@localhost/'
    DATABASE_NAME = 'user-management'
    APP_SETTINGS = 'config.DevelopmentConfig'
    
    
    