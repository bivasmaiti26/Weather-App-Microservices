package com.blitzkrieg.sessionmanagement.controllers;
import com.blitzkrieg.sessionmanagement.models.Session;
import com.blitzkrieg.sessionmanagement.repository.SessionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {
    private final SessionRepository repository ;

    public TestController(SessionRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/getSessions/{username}")
    public List<Session> postMessage(@PathVariable("username") final String username) {
        return repository.findByUserName(username);
    }

}
