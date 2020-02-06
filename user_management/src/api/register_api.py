# user_management/scr/api/register_api.py

from flask import request, make_response, jsonify, Blueprint

from user_management.src import db
from user_management.src.model.user_model import User

register_api_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

"""
User registration api
"""
@register_api_blueprint.route('/register', method=('POST'))
def register():
    data = request.get_json()
    
    user = User.query.filter_by(username=data.get('username')).first()
    
    if not user:
        try:
            user = User(
                    username=data.get('username'),
                    email=data.get('email'),
                    password=data.get('password')
                    )
            
            # insert user in database
            db.session.add(user)
            db.session.commit()
            
            token = user.generate_token()
            
            response = {
                    'status': 'success',
                    'message': 'User successfully registered.',
                    'auth_token': token.decode()
                    }
            return make_response(jsonify(response)), 201
        
        except Exception:
            response = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.',
                    }
            return make_response(jsonify(response)), 401
        
    else:
        response = {
                    'status': 'fail',
                    'message': 'User already exists. Please log in.',
                    }
        return make_response(jsonify(response)), 202
        