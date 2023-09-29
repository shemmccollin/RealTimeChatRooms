package com.shem.project.chatroomserver.services;

import com.shem.project.chatroomserver.models.Message;
import com.shem.project.chatroomserver.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Message addMessage(Message message){
        message.setTimestamp(LocalDateTime.now().toString());
        message.setEdited(false);
        return chatRepository.insert(message);
    }

    public List<Message> getMessages(String channelId)
    {
        return chatRepository.findAllByChannelId(channelId);
    }

    public void deleteMessage(Message message)
    {
        chatRepository.deleteById(message.getId());
    }

    public Message editMessage(Message message)
    {
        message.setEdited(true);
        return chatRepository.save(message);
    }
}
