const socket = require('./../websockets/socket')
const config = require('./../config');
  try{
    var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
        client,
        [
            { topic: config.inbound_topic, partition: 0 }
        ],
        {
            autoCommit: false
        }
    );
    consumer.on('message', function (message) {
      socket.wss.clients.forEach(function each(client) {
        client.send(message.value);
    });
  });
}
catch(e){
  console.log(e);
}