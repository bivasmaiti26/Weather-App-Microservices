const axios = require('axios');
const util = require('../utils');
exports.validateToken = function(req, res) {
    var zookeeper = require('node-zookeeper-client');
    var host,port;
    var client = zookeeper.createClient('localhost:2181');
    var path = '/session_management';
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
            url = "http://" + host + ":" + port.toString() + '/tokens/validate';
            validateAPICall(url, req.body.token, res);
        }
    );    
    
    client.connect();

    function validateAPICall(url, tokenToCheck, res)
    {
        return axios({
            method: "post",
            url: url,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            data: {
               tokenToCheck
            },
            transformRequest: [(data) => {
                return data.tokenToCheck;
            }]
          })
          .then(response => {
            res.send(response.data);
            // util.addNewSession({
            //     requestTime:new Date(),
            //     userName: "user1",
            //     requestName: "some request",
            //     requestStatus:true
            // });
          })
          .catch(err => {
            res.send(err.response.status).send(err.response.body);
          });
    }
};
