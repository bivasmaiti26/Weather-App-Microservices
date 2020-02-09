# user_management/src/__init__.py

from user_management.src.const import Constant as constant

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

db_engine = create_engine(constant.DATABASE_BASE_URL + constant.DATABASE_NAME)

if not database_exists(db_engine.url):
    create_database(db_engine.url)

app = Flask(__name__)

app_settings = constant.APP_SETTINGS
app.config.from_object(app_settings)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

from user_management.src.model.user_model import User
db.create_all()
db.session.commit()

from user_management.src.api.auth.register_api import register_blueprint 
from user_management.src.api.auth.login_api import login_blueprint 
from user_management.src.api.auth.user_details_api import user_details_blueprint 

app.register_blueprint(register_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(user_details_blueprint)