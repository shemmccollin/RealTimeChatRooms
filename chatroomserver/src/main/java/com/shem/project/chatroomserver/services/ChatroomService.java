package com.shem.project.chatroomserver.services;

import com.shem.project.chatroomserver.models.Chatroom;
import com.shem.project.chatroomserver.models.Statistics;
import com.shem.project.chatroomserver.repositories.ChatRepository;
import com.shem.project.chatroomserver.repositories.ChatroomRepository;
import com.shem.project.chatroomserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;
import java.util.Optional;

@Service
public class ChatroomService {

    @Autowired
    private ChatroomRepository chatroomRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    public Chatroom saveChatroom(Chatroom chatroom){
        chatroom.setTimestamp(LocalDateTime.now().toString());
        return chatroomRepository.insert(chatroom);
    }

    public void deleteChatroom(Chatroom chatroom)
    {
        chatRepository.deleteAllByChannelId(chatroom.getId());
        chatroomRepository.deleteById(chatroom.getId());
    }

    public Chatroom updateChatroom(Chatroom chatroom){
        return chatroomRepository.save(chatroom);
    }

    public List<Chatroom> GetChannels(){

        return chatroomRepository.findAll();
    }

    public Optional<Chatroom> GetChannel(String id){

        return chatroomRepository.findById(id);
    }

    public Statistics GetStats(){
        Statistics stats = new Statistics();
        stats.setNoChannels(chatroomRepository.count());
        stats.setNoMessages(chatRepository.count());
        stats.setNoUsers(userRepository.count());

        return stats;
    }
}
