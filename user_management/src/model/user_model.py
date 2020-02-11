# user_management/src/model/user_model.py
import sys
from src import app, db, bcrypt, const

import jwt
import datetime

class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, username, email, password, admin=False):
        self.username = username
        self.email = email
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()
        self.registered_on = datetime.datetime.now()
        self.admin = admin
        
    def __repr__(self):
        return '<User %r>' % self.username
    
    def generate_token(self):
        """
        Generates the JWT Token
        :return: string
        """
        try:
            exp_time = const.Constant.JWT_TOKEN_EXP_DAY_HR_MIN_SEC
            exp_day, exp_hr, exp_min, exp_sec = exp_time.split(':')
            payload = {
                    'sub': self.username,
                    'admin':self.admin,
                    'iat': datetime.datetime.utcnow(),
                    'exp': datetime.datetime.utcnow() + 
                           datetime.timedelta(days=int(exp_day), hours=int(exp_hr), minutes=int(exp_min), seconds=int(exp_sec))
                    }
            return jwt.encode(payload,
                              app.config.get('SECRET_KEY'),
                              algorithm='HS256'
                              )
        except Exception as e:
            return e
    
    @staticmethod    
    def validate_token(token):
        try:
            payload = jwt.decode(token, app.config.get('SECRET_KEY'))
            return payload['sub'], payload['admin']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'