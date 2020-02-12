import rpyc
from rpyc.utils.server import ThreadedServer
import requests
import json
from kafka import KafkaProducer
import pickle

def publish_message(producer, topic, value):
    try:
        producer.send(topic, value=value)
        producer.flush()
        print('Message published successfully.')
        return True
    except Exception as ex:
        print('Exception in publishing message')
        print(str(ex))
        return False


def connect_kafka_producer():
    _producer = None
    try:
        _producer = KafkaProducer(bootstrap_servers=['localhost:9092'], api_version=(0, 10))
    except Exception as ex:
        print('Exception while connecting Kafka')
        print(str(ex))
    finally:
        return _producer

class DataRetrieverService(rpyc.Service):
    def on_connect(self, conn):
        pass

    def on_disconnect(self, conn):
        pass

    def exposed_get_url(self, city):
        print(city)

        longitude = 39.7456
        latitude = -97.0892

        api_endpoint = "https://api.weather.gov/points/" + str(longitude) + "," + str(latitude)
        weather_data = requests.get(api_endpoint).content
        parsed = json.loads(weather_data)
        if len(weather_data) > 0:
            kafka_producer = connect_kafka_producer()
            serialize_weather_data = pickle.dumps(parsed["properties"]["forecastHourly"])
            print(parsed["properties"]["forecastHourly"])
            status = publish_message(kafka_producer, 'T2', serialize_weather_data)
            print(status)
            if kafka_producer is not None:
                kafka_producer.close()
            if status:
                return True
            else:
                return False


if __name__ == '__main__':
    port = 9002
    rpyc.core.protocol.DEFAULT_CONFIG['sync_request_timeout'] = None
    t = ThreadedServer(DataRetrieverService, port=port, protocol_config=rpyc.core.protocol.DEFAULT_CONFIG)
    try:
        t.start()
    except Exception:
        t.stop()
