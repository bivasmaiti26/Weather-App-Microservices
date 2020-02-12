from flask import Flask, request
import requests
from flask_pymongo import PyMongo
from kafka import KafkaConsumer
import pickle
import json

import rpyc

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'weather_db'
app.config['MONGO_URI'] = 'mongodb+srv://weather_user:weather@cluster0-4xpye.mongodb.net/weather_db?retryWrites=true&w=majority'

mongo = PyMongo(app)

post_processor_url = 'localhost'
post_processor_port = 9001
rpyc.core.protocol.DEFAULT_CONFIG['sync_request_timeout'] = None
post_processor = rpyc.connect(post_processor_url, post_processor_port,
                              config=rpyc.core.protocol.DEFAULT_CONFIG).root

data_retriever_url = 'localhost'
data_retriever_port = 9002
rpyc.core.protocol.DEFAULT_CONFIG['sync_request_timeout'] = None
data_retriever = rpyc.connect(data_retriever_url, data_retriever_port,
                              config=rpyc.core.protocol.DEFAULT_CONFIG).root


@app.route('/model-executor', methods=['GET'])
def execute():
    params = request.args.to_dict()
    city = params['city']

    city_url = mongo.db.city.find_one({'city': city})

    print(city_url)

    if city_url:
        model_url = city_url["url"]
        weather_data = requests.get(model_url).content
        print(model_url)
        processed = rpyc.async_(post_processor.process)(weather_data)
        urls = rpyc.async_(data_retriever.get_url)("city")

        print(processed)

        while not processed:
            continue
        topic_name = 'T3'

        consumer = KafkaConsumer(topic_name, auto_offset_reset='earliest', bootstrap_servers=['localhost:9092'],
                                 api_version=(0, 10), consumer_timeout_ms=1000)
        for msg in consumer:
            data = pickle.loads(msg.value)
            print(data)
            print("data from postprocess")
        consumer.close()
    else:
        urls = rpyc.async_(data_retriever.get_url)("city")

        topic_name = 'T2'
        topic_url = ""
        while not urls:
            continue

        consumer = KafkaConsumer(topic_name, bootstrap_servers=['localhost:9092'],
                                 api_version=(0, 10), consumer_timeout_ms=1000)
        for msg in consumer:
            topic_url = pickle.loads(msg.value)
            print(urls)
            id = mongo.db.city.insert({"city": city, "url":topic_url})
        consumer.close()
        weather_data = requests.get(topic_url).content
        data = json.loads(weather_data)
        print(data)

        processed = rpyc.async_(post_processor.process)(data)

        while not processed:
            continue

        topic_name = 'T3'

        consumer = KafkaConsumer(topic_name, auto_offset_reset='earliest', bootstrap_servers=['localhost:9092'],
                                 api_version=(0, 10), consumer_timeout_ms=1000)
        for msg in consumer:
            data = pickle.loads(msg.value)
            print(data)
            print("data from postprocess")
        consumer.close()

    return ""


if __name__ == '__main__':
    app.run()