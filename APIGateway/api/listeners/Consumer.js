module.exports = {
  createTopicAndRun: function() {
    var HashMap = require('hashmap');
    user_socker_map = new HashMap();
    var kafka = require('kafka-node')
    var client = new kafka.KafkaClient({kafkaHost:"kafka:29092"});
    try
    {
      var topicsToCreate = [{
        topic: 'T3',
        partitions: 1,
        replicationFactor: 1
      }]
      client.createTopics(topicsToCreate, (error, result) => {
        console.log('error '+ error);
        WebSocketServer = require('ws').Server;
        global.wss = new WebSocketServer({ port: 9090 });
        wss.on('connection', function(ws,req) {
          const url = require('url');
          const { query: { token } } = url.parse(req.url, true);
          user_socker_map.set(token,ws);
          
        });
        try{
          var kafka = require('kafka-node'),
          Consumer = kafka.Consumer,
          //client = new kafka.KafkaClient({kafkaHost:"kafka:29092"}),
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
            let message_token = JSON.parse(message.value)[0].token;
            if(user_socker_map.has(message_token)){
              user_socker_map.get(message_token).send(message.value);
            }
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