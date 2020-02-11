package com.blitzkrieg.sessionmanagement.repository;
import com.blitzkrieg.sessionmanagement.models.BlackToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import java.util.List;
@RepositoryRestResource(collectionResourceRel = "blackTokens", path = "blackTokens")
public interface BlackTokenRepository extends MongoRepository<BlackToken,String> {
    public List<BlackToken> findByToken(String token);
}
