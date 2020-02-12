module.exports = {
runComsumer: function() {
  WebSocketServer = require('ws').Server;
  wss = new WebSocketServer({ port: 9090 });
  try{
    var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
        client,
        [
            { topic: 'T13', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );

    consumer.on('message', function (message) {
      console.log(message.value);
      wss.clients.forEach(function each(client) {
        client.send(message.value);
    });
  });
}
catch(e){
  console.log(e);
}}
}