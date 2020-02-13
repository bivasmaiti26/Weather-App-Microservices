# user_management/src/api/auth/user_details_api.py

from flask.views import MethodView
from flask import request, make_response, jsonify, Blueprint

from src import *

user_details_blueprint = Blueprint('user_details', __name__)

class UserDetailsAPI(MethodView):
    """
    User details api
    """
    def get(self):
        authorization_header = request.headers.get('Authorization')
        if authorization_header:
            token = authorization_header.split(" ")[1]
        else:
            token = ''
        if token:
            validation_response = User.validate_token(token)
            if len(validation_response) == 2:
                user = User.query.filter_by(username=validation_response[0]).first()
                response = {
                        'username': user.username,
                        'email': user.email,
                        'is_admin': user.admin,
                        'registered_on': user.registered_on
                    }
                return make_response(jsonify(response)), 200
            
            response = {
                'status': 'fail',
                'message': validation_response
            }
            return make_response(jsonify(response)), 401
        else:
            response = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(response)), 401
        
# Register API with view
user_details_view = UserDetailsAPI.as_view('user_details_api')

# Route path for API endpoint
user_details_blueprint.add_url_rule(
    '/auth/user_details',
    view_func=user_details_view,
    methods=['GET']
)