WebSocketServer = require('ws').Server
module.exports = {
wss : new WebSocketServer({ port: 9090 })
}
// var express = require('express');
// var app = express();
// var i = 0; 
// Start REST server on port 8081
// var server = app.listen(8081, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("Websocket event broadcaster REST API listening on http://%s:%s", host, port)
// });

// // Broadcast updates to all WebSocketServer clients
// app.post('/notify/spanner', function (req, res) {
//    var city_id = req.params.city_id;
//    wss.clients.forEach(function each(client) {
//        i++;
//       client.send("broadcast: spanner "+i+" updated");
//     });
//    res.sendStatus(200);
// });