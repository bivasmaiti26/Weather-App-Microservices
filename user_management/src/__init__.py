# user_management/src/__init__.py
from src.const import Constant as constant

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

from kazoo.client import KazooClient
from kazoo.exceptions import NodeExistsError, ConnectionLossException

import json

db_engine = create_engine(constant.DATABASE_BASE_URL + constant.DATABASE_NAME)
if not database_exists(db_engine.url):
    create_database(db_engine.url)

def registerUserManagementService(host, port):
    try:
        zk = KazooClient(hosts = 'zookeeper', read_only = True)
        zk.start()
        path = '/user_management'
        data = json.dumps({'host': host, 'port': port}).encode('utf-8')
    
        zk.create(path, value = data, ephemeral = True, makepath = True)
        print('user_management service is running on ' + path + ':' + str(port))
    except NodeExistsError:
        print('Node already exists in zookeeper')
    except ConnectionLossException:
        zk.stop()
        
app = Flask(__name__)
app.config.from_object(constant.APP_SETTINGS)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

from src.model.user_model import User
db.create_all()
db.session.commit()

from src.api.auth.register_api import register_blueprint
from src.api.auth.login_api import login_blueprint
from src.api.auth.user_details_api import user_details_blueprint
from src.api.auth.logout_api import logout_blueprint

app.register_blueprint(register_blueprint)
app.register_blueprint(login_blueprint)
app.register_blueprint(user_details_blueprint)
app.register_blueprint(logout_blueprint)

if __name__ == '__main__':
    registerUserManagementService(host = constant.HOST, port = constant.PORT)
    app.run(host = constant.HOST, port = constant.PORT, debug = False)