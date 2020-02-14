package com.blitzkrieg.sessionmanagement.controllers;
import com.blitzkrieg.sessionmanagement.models.Session;
import com.blitzkrieg.sessionmanagement.repository.SessionRepository;
import com.blitzkrieg.sessionmanagement.security.TokenUtility;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/")
public class SessionController {
    private final SessionRepository repository ;
    public SessionController(SessionRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/getSessions/{username}")
    public List<Session> postMessage(@PathVariable("username") final String username) {

        return repository.findByUserName(username);
    }
    @PostMapping("/addNewSession")
    public Session saveSession(@RequestBody Session session){
        TokenUtility util = new TokenUtility();
        session.setUserName(util.getUserNameFromToken(session.getToken()));
        return repository.save(session);
    }



}
