const axios = require('axios')

exports.getWeatherData = function() {
    var zookeeper = require('node-zookeeper-client');
    var host,port;
    var client = zookeeper.createClient('localhost:2181');
    var path = '/WeatherData';
    var url;
    client.getData(
        path,
        function (event) {
            console.log('Got event: %s.', event);
        },
        function (error, data, stat) {
            if (error) {
                console.log(error.stack);
                return;
            }
            zookeeper_data = JSON.parse(data.toString('utf8'))
            host = zookeeper_data["host"];
            port = zookeeper_data["port"];
            url = "http://"+host+":"+port.toString()+'/getWeatherData';
        }
    );    
    client.connect();

    function WeatherServiceAPICall(url)
    {
        return axios({
            method: "post",
            url: url,
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(response => {
            console.log("Data added to kafka")
          })
          .catch(err => {
            console.log(err);
          });
    }
};