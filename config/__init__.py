# user-management/config/__init__.py

from const import Constant as constant

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

db_engine = create_engine(constant.DATABASE_BASE_URL + constant.DATABASE_NAME)

if not database_exists(db_engine.url):
    create_database(db_engine.url)

app = Flask(__name__)
app_settings = constant.APP_SETTINGS

app.config.from_object(app_settings)

db = SQLAlchemy(app)