import rpyc
from rpyc.utils.server import ThreadedServer
from kafka import KafkaProducer
import json


class PostProcessService(rpyc.Service):
    def publish_message(self,producer, topic, value):
       # print("Trying to publish",value, "to topic", topic)
        try:
            producer.send(topic, value=value)
            producer.flush()
            print('Message published successfully.')
            return True
        except Exception as ex:
            print('Exception in publishing message')
            print(ex)
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

    def on_connect(self, conn):
        print("connected")
        pass

    def on_disconnect(self, conn):
        pass

    def exposed_process(self, data):
        result = []
        data = json.loads(data)
        for entry in data["properties"]["periods"]:
            if entry['number'] == 25:
                break
            result.append(entry)
        if len(result) > 0:
            kafka_producer = self.connect_kafka_producer()
            serialize_weather_data = json.dumps(result).encode('utf-8')
            print(serialize_weather_data)
            status = self.publish_message(kafka_producer, 'T3', serialize_weather_data)
            if kafka_producer is not None:
                kafka_producer.close()
            if status:
                return True
            else:
                return False

if __name__ == '__main__':
    port = 9001
    rpyc.core.protocol.DEFAULT_CONFIG['sync_request_timeout'] = None
    t = ThreadedServer(PostProcessService, port=port, protocol_config=rpyc.core.protocol.DEFAULT_CONFIG)
    try:
        t.start()
    except Exception:
        t.stop()
