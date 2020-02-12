# user_management/scr/api/auth/login_api.py

from flask.views import MethodView
from flask import request, make_response, jsonify, Blueprint

from src import bcrypt
from src.model.user_model import User

from kafka import KafkaProducer
import pickle

logout_blueprint = Blueprint('logout', __name__)

class LogoutAPI(MethodView):
    """
    User login api
    """
    
    def publish_message(self,producer, topic, value):
        try:
            producer.send(topic, value=value)
            producer.flush()
            print('Message published successfully.')
            return True
        except Exception as ex:
            print('Exception in publishing message')
            print(str(ex))
            return False

    def connect_kafka_producer(self):
        _producer = None
        try:
            _producer = KafkaProducer(bootstrap_servers=['localhost:9092'], api_version=(0, 10))
        except Exception as ex:
            print('Exception while connecting Kafka')
            print(str(ex))
        finally:
            return _producer
    
    def post(self):
        authorization_header = request.headers.get('Authorization')
        if authorization_header:
            token = authorization_header.split(" ")[1]
        else:
            token = ''
        if token:
            validation_response = User.validate_token(token)
            if len(validation_response) == 2:
                try:
                    kafka_producer = self.connect_kafka_producer()
                    serialize_weather_data = pickle.dumps(token)
                    self.publish_message(kafka_producer, 'invalidate_token', serialize_weather_data)
                    if kafka_producer is not None:
                        kafka_producer.close()
                    
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged out.'
                    }
                    return make_response(jsonify(responseObject)), 200
                
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Some error occurred. Please try again.',
                        'error': e
                    }
                    return make_response(jsonify(responseObject)), 403
            else:
                responseObject = {
                    'status': 'fail',
                    'message': validation_response
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 403
    
# Register API with view
logout_view = LogoutAPI.as_view('login_api')

# Route path for API endpoint
logout_blueprint.add_url_rule(
    '/auth/logout',
    view_func=logout_view,
    methods=['POST']
)