import rpyc
from rpyc.utils.server import ThreadedServer
import requests
import json

class DataRetrieverService(rpyc.Service):
    def on_connect(self, conn):
        pass

    def on_disconnect(self, conn):
        pass

    def exposed_get_url(self, address):
        api_endpoint = "https://api.weather.gov/points/" + address
        weather_data = requests.get(api_endpoint).content
        parsed = json.loads(weather_data)
        return parsed["properties"]["forecastHourly"]

if __name__ == '__main__':
    port = 9002
    rpyc.core.protocol.DEFAULT_CONFIG['sync_request_timeout'] = None
    t = ThreadedServer(DataRetrieverService, port=port, protocol_config=rpyc.core.protocol.DEFAULT_CONFIG)
    try:
        t.start()
    except Exception:
        t.stop()
