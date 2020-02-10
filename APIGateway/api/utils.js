'use strict';
var jwt = require('jsonwebtoken');

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