package com.blitzkrieg.sessionmanagement.security;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.blitzkrieg.sessionmanagement.models.BlackToken;
import com.blitzkrieg.sessionmanagement.repository.BlackTokenRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class TokenUtility {

    public ResponseEntity<String> validateToken(BlackTokenRepository repository, String token){
        try {
            List<BlackToken> blackTokenList = repository.findByToken(token);
            if (blackTokenList.size()==0) {
                Algorithm algorithm = Algorithm.HMAC256(System.getenv("SECRET_KEY"));
                JWTVerifier verifier = JWT.require(algorithm)
                        .build();
                DecodedJWT jwt = verifier.verify(token);
                return new ResponseEntity<>(jwt.getSubject().toString(), HttpStatus.OK);
            }else{
                    return new ResponseEntity<>("User Logged out",HttpStatus.UNAUTHORIZED);
                }
            } catch(JWTVerificationException exception){
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.UNAUTHORIZED);
            }
            catch (Exception exception){
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
    public String getUserNameFromToken(String token){
        try{
            System.out.println(token);
            Algorithm algorithm = Algorithm.HMAC256(System.getenv("SECRET_KEY"));
            System.out.println(System.getenv("SECRET_KEY"));
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getSubject().toString();

        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
            return "User not found";
        }
    }

}
