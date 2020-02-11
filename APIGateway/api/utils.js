'use strict';
var jwt = require('jsonwebtoken');
const axios = require('axios');
module.exports = {
    get_auth_token: function (req) {
        auth_header = req.header('Authorization');
        if (auth_header && auth_header.split(' ')[0] === 'Bearer') {
            return auth_header.split(' ')[1];
        } else {
            return null;
        }
    }
};


module.exports = {
    addNewSession: function(sessionToSave) {
    var zookeeper = require('node-zookeeper-client');
    var host,port,url;
    var client = zookeeper.createClient('localhost:2181');
    var path = '/session_management';
    console.log(sessionToSave);
    client.getData(
        path,
        function (event) {
            console.log('Got event: %s.', event);
        },
        function (error, data) {
            if (error) {
                console.log(error.stack);
                return;
            }
            zookeeper_data = JSON.parse(data.toString('utf8'))
            host = zookeeper_data["host"];
            port = zookeeper_data["port"];
            url = "http://" + host + ":" + port.toString() + "/sessions";
            return RegisterAPICall(url,sessionToSave);
        }
    );    
    
    client.connect();

function RegisterAPICall(url,sessionToSave)
    {   
        
        return axios({
            method: "post",
            url: url,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            data: sessionToSave
          })
          .then(response => {
            console.log(response.data);
            return response.data;
            
          })
          .catch(err => {
            console.log(err);
            return err.data;
          });
    }
}

}