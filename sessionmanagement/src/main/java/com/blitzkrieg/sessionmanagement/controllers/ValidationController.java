package com.blitzkrieg.sessionmanagement.controllers;
import com.blitzkrieg.sessionmanagement.repository.BlackTokenRepository;
import com.blitzkrieg.sessionmanagement.security.TokenUtility;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tokens")
public class ValidationController {
    private final BlackTokenRepository repository ;
    public ValidationController(BlackTokenRepository repository) {
        this.repository = repository;
    }
    @PostMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestBody String token) {
        TokenUtility util = new TokenUtility();
        return util.validateToken(repository,token);

    }
}
