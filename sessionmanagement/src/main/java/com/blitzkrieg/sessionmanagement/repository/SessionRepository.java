package com.blitzkrieg.sessionmanagement.repository;

import com.blitzkrieg.sessionmanagement.models.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "sessions", path = "sessions")
public interface SessionRepository extends MongoRepository<Session,String> {
    public List<Session> findByUserName(String userName);
}
