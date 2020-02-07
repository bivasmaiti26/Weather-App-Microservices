'use strict';
module.exports = function(app) {
  var WeatherControllerObject = require('../controllers/WeatherController');

  // todoList Routes
  app.route('/getWeatherData')
    .get(WeatherControllerObject.getWeatherData)   
};
