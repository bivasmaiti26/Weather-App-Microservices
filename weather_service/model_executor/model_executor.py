from flask import Flask, request
import requests
from flask_pymongo import PyMongo
from kazoo.client import KazooClient
from kazoo.exceptions import NodeExistsError, ConnectionLossException
import rpyc
import json

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

def registerModelExecutorService(host, port):
    try:
        zk = KazooClient(hosts = 'zookeeper', read_only = True)
        zk.start()
        path = '/WeatherData'
        data = json.dumps({'host': host, 'port': port}).encode('utf-8')
    
        zk.create(path, value = data, ephemeral = True, makepath = True)
        print('model_executor service is running on ' + path + ':' + str(port))
    except NodeExistsError:
        print('Node already exists in zookeeper')
    except ConnectionLossException:
        zk.stop()
        
@app.route('/model-executor', methods=['POST'])
def execute():
    params = request.args.to_dict()
    lat = params['lat']
    long = params['long']
    address_key = 'lat:' + str(lat) + ' long:' + str(long)
    city_url = mongo.db.city.find_one({'address': address_key})

    if city_url:
        model_url = city_url["url"]
        weather_data = requests.get(model_url).content
        processed = rpyc.async_(post_processor.process)(weather_data)

        while not processed.ready:
            continue
        
    else:
        address = str(lat) + ',' + str(long)
        url = data_retriever.get_url(address)
        print('url', url)
        mongo.db.city.insert_one({'address': address_key, 'url':url})
        weather_data = requests.get(url).content
        processed = rpyc.async_(post_processor.process)(weather_data)

        while not processed.ready:
            continue
    return ""

if __name__ == '__main__':
    registerModelExecutorService(host = 'modelexec', port = 9003)
    app.run(host = '0.0.0.0', port = 9003, debug = False)
