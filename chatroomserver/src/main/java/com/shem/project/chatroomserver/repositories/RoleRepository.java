package com.shem.project.chatroomserver.repositories;

import com.shem.project.chatroomserver.models.EnumRole;
import com.shem.project.chatroomserver.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(EnumRole name);
}
