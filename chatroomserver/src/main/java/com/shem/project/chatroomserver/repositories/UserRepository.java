package com.shem.project.chatroomserver.repositories;

import com.shem.project.chatroomserver.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String Username);
    Boolean existsByEmail(String email);
}
