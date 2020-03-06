module.exports = {
    createTopic: function() {
    WebSocketServer = require('ws').Server;
    wss = new WebSocketServer({ port: 9090 });        
    var kafka = require('kafka-node')
    var client = new kafka.KafkaClient();
    try{
  
      var topicsToCreate = [{
        topic: 'T3',
        partitions: 1,
        replicationFactor: 1
      }]
       
      client.createTopics(topicsToCreate, (error, result) => {
        console.log("result",result);
        console.log("error",error);
        return true;
      });
      
    }
    catch(e){
      console.log(e);
      return false;
    }
  }
  }