package com.shem.project.chatroomserver.repositories;

import com.shem.project.chatroomserver.models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<Message, String> {

    public List<Message> findAllByChannelId(String channelId);
    public void deleteAllByChannelId(String channelId);
}
