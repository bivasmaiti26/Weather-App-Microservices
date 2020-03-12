const axios = require('axios')
const utils = require('../utils');
exports.getWeatherData = function(req,res) {
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
            let token = '';
            auth_header = req.header('Authorization');
            console.log(auth_header);
            
            if (auth_header && auth_header.split(' ')[0] === 'Bearer') {
                token =  auth_header.split(' ')[1];
            }
            console.log()
            var long = req.body.latlng.lng;
            var lat = req.body.latlng.lat;
            var city = req.body.value;
            url = "http://"+host+":"+port.toString()+'/model-executor?lat=' + lat + '&long=' + long;
            WeatherServiceAPICall(url,res,token,city)
        }
    );    
    client.connect();

    function WeatherServiceAPICall(url,res,token,cityName)
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
            utils.addNewSession({
              requestTime:new Date(),
              requestName: "Weather",
              city: cityName,
              requestStatus:true,
              token, token
            });
            res.send('')
          })
          .catch(err => {
            utils.addNewSession({
              requestTime:new Date(),
              token, token,
              requestName: "Weather",
              city: cityName,
              requestStatus:false
            });
            console.log(err);
          });
    }
};
