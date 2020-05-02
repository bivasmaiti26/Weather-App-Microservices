const axios = require('axios');
var utils = require('../utils');
var cors = require('cors')

exports.login = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var zookeeper = require('node-zookeeper-client');
    var host,port;
    var client = zookeeper.createClient('zookeeper1:2181');
    var path = '/user_management';
    var url;
    var username, password;
    
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
            url = "http://" + host + ":" + port.toString() + '/auth/login';
            
            username = req.body.username;
            password = req.body.password;

            LoginAPICall(url, username, password, res);
        }
    );    
    
    client.connect();

    function LoginAPICall(url, username, password, res)
    {
        console.log(url);
        console.log(res);
        return axios({
            method: "post",
            url: url,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            data: {
                "username": username,
                "password": password
            }
          })
          .then(response => {
            res.send(response.data);
            utils.addNewSession({
              requestTime:new Date(),
              userName: username,
              requestName: "Login",
              requestStatus:true
            });
          })
          .catch(err => {
            console.log(err);
            res.send(err.response.data);
            utils.addNewSession({
              requestTime:new Date(),
              userName: username,
              requestName: "Login",
              requestStatus:false
            });
          });
    }
};

exports.register = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var zookeeper = require('node-zookeeper-client');
    var host,port;
    var client = zookeeper.createClient('zookeeper1:2181');
    var path = '/user_management';
    var url;
    var username, password;
    
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
            
            url = "http://" + host + ":" + port.toString() + '/auth/register';
            
            username = req.body.username;
            email = req.body.email;
            password = req.body.password;

            RegisterAPICall(url, username, email, password, res);
        }
    );    
    
    client.connect();

    function RegisterAPICall(url, username, email, password, res)
    {
        return axios({
            method: "post",
            url: url,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            data: {
                "username": username,
                "email": email,
                "password": password
            }
          })
          .then(response => {
            utils.addNewSession({
                requestTime:new Date(),
                userName: username,
                requestName: "Register",
                requestStatus:true
            });
            res.send(response.data);
          })
          .catch(err => {
            res.send({ err });
          });
    }
};

exports.user_details = function(req, res) {
    var zookeeper = require('node-zookeeper-client');
    var host,port;
    var client = zookeeper.createClient('zookeeper1:2181');
    var path = '/user_management';
    var url;
    var username, password;
    
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
            
            url = "http://" + host + ":" + port.toString() + '/auth/user_details';
            
            var token = '';

            auth_header = req.header('Authorization');
            if (auth_header && auth_header.split(' ')[0] === 'Bearer') {
              token = auth_header.split(' ')[1];
            } 
            
            UserDetailsAPICall(url, token, res);
        }
    );    
    
    client.connect();

    function UserDetailsAPICall(url, token, res)
    {
        return axios({
            method: "get",
            url: url,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": "Bearer " + token
            }
          })
          .then(response => {
            console.log("In user_details controller call, response: " + response.data);
            res.send(response.data);
          })
          .catch(err => {
            console.log("In user_details controller call, err: " + err);
            res.send({ err });
          });
    }
};
