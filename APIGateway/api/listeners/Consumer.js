module.exports = {
  createTopicAndRun: function() {
    var kafka = require('kafka-node')
    var client = new kafka.KafkaClient({kafkaHost:"localhost:9092"});
    try
    {
      var topicsToCreate = [{
        topic: 'T3',
        partitions: 1,
        replicationFactor: 1
      }]
      client.createTopics(topicsToCreate, (error, result) => {
        WebSocketServer = require('ws').Server;
        wss = new WebSocketServer({ port: 9090 });
        try{
          var kafka = require('kafka-node'),
          Consumer = kafka.Consumer,
          client = new kafka.KafkaClient({kafkaHost:"localhost:9092"}),
          consumer = new Consumer(
            client,
            [
                { topic: 'T3', partition: 0 }
            ],
            {
                autoCommit: false
            }
          );
          consumer.on('message', function (message) {
            // console.log(message);
            console.log('here');
            wss.clients.forEach(function each(client) {
                client.send(message.value);
            });
          });
        }
        catch(e){
          console.log(e);
        }
      });
    }
    catch(e){
      console.log(e);
    }
  }
}
