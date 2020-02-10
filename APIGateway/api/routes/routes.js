'use strict';
module.exports = function(app) {
  var WeatherControllerObject = require('../controllers/WeatherController');
  var UserManagementControllerObject = require('../controllers/UserManagementController');
  
  // todoList Routes
  app.route('/getWeatherData')
    .get(WeatherControllerObject.getWeatherData);
    
  app.route('/login')
    .post(UserManagementControllerObject.login);

  app.route('/register')
    .post(UserManagementControllerObject.register); 
    
    app.route('/user_details')
    .get(UserManagementControllerObject.user_details); 
};
