# user_management/scr/api/register_api.py

from flask.views import MethodView
from flask import request, make_response, jsonify, Blueprint

from user_management.src import db
from user_management.src.model.user_model import User

register_api_blueprint = Blueprint('api', __name__)

class RegisterAPI(MethodView):
    """
    User registration api
    """
    
    def post(self):
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
        
# Register API with view
register_view = RegisterAPI.as_view('register_api')

# Route path for API endpoint
register_api_blueprint.add_url_rule(
    '/api/register',
    view_func=register_view,
    methods=['POST']
)