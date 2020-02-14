//package com.blitzkrieg.sessionmanagement.kafka;
//import com.blitzkrieg.sessionmanagement.models.BlackToken;
//import com.blitzkrieg.sessionmanagement.repository.BlackTokenRepository;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public class Consumer {
//    private BlackTokenRepository repository;
//    //invalidate_token
//    public Consumer(BlackTokenRepository repository) {
//        this.repository = repository;
//
//    }
//    @KafkaListener(topics = "invalidate_token", groupId = "group_id")
//    public void consume(String message) {
//        BlackToken blackToken = new BlackToken(message.toString(),new Date());
//        repository.save(blackToken);
//    }
//
//}
