# user_management/scr/api/auth/login_api.py

from flask.views import MethodView
from flask import request, make_response, jsonify, Blueprint

from src import bcrypt
from src.model.user_model import User

login_blueprint = Blueprint('login', __name__)

class LoginAPI(MethodView):
    """
    User login api
    """
    
    def post(self):
        data = request.get_json()
        
        try:
            user = User.query.filter_by(username=data.get('username')).first()
            
            if user:
                
                if bcrypt.check_password_hash(user.password, 
                                                   data.get('password')):
                    token = user.generate_token()
                    if token:
                        response = {
                            'status': 'success',
                            'message': 'Login successful.',
                            'auth_token': token.decode()
                        }
                        return make_response(jsonify(response)), 200
                else:
                    response = {
                    'status': 'fail',
                    'message': 'Incorrect username or password.'
                }
                return make_response(jsonify(response)), 401
            else:
                response = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return make_response(jsonify(response)), 404
        
        except Exception:
            response = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(response)), 500
        
# Register API with view
login_view = LoginAPI.as_view('login_api')

# Route path for API endpoint
login_blueprint.add_url_rule(
    '/auth/login',
    view_func=login_view,
    methods=['POST']
)