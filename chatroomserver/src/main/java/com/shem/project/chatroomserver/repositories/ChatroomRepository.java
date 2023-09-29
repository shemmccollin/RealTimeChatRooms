package com.shem.project.chatroomserver.repositories;

import com.shem.project.chatroomserver.models.Chatroom;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatroomRepository extends MongoRepository<Chatroom, String> {
}
