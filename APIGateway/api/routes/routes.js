'use strict';
module.exports = function(app) {
  var WeatherControllerObject = require('../controllers/WeatherController');
  var UserManagementControllerObject = require('../controllers/UserManagementController');
  var SessionManagementControllerObject = require('../controllers/SessionManagementController')
  // todoList Routes
  app.route('/getWeatherData')
    .post(WeatherControllerObject.getWeatherData);
    
  app.route('/login')
    .post(UserManagementControllerObject.login);

  app.route('/register')
    .post(UserManagementControllerObject.register); 
    
    app.route('/user_details')
    .get(UserManagementControllerObject.user_details); 
    
  app.route('/token/validate')
    .post(SessionManagementControllerObject.validateToken)
};
