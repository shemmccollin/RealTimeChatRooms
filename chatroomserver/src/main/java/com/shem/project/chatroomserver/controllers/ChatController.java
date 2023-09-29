package com.shem.project.chatroomserver.controllers;

import com.shem.project.chatroomserver.models.Chatroom;
import com.shem.project.chatroomserver.models.Status;
import com.shem.project.chatroomserver.services.ChatService;
import com.shem.project.chatroomserver.services.ChatroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.shem.project.chatroomserver.models.Message;

import java.time.LocalDateTime;
import java.util.Random;

@Controller
public class ChatController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatroomService chatroomService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/channels") // /app/channels
    @SendTo("/channels")
    private Chatroom receiveChannel(@Payload Chatroom chatroom){
        // For testing purposes, displays the chatroom data
        System.out.println(chatroom);

        if(chatroom.getStatus().equals(Status.CREATE_CHANNEL))
        {
            chatroom = chatroomService.saveChatroom(chatroom);
        }
        else if(chatroom.getStatus().equals(Status.EDIT_CHANNEL))
        {
            chatroom = chatroomService.updateChatroom(chatroom);
        }
        else if(chatroom.getStatus().equals(Status.DELETE_CHANNEL))
        {
            chatroomService.deleteChatroom(chatroom);
        }

        return chatroom;
    }

    @MessageMapping("/message")  // /app/message
    public Message receiveMessage(@Payload Message message){
        // For testing purposes, displays the message data
        System.out.println(message);

        Random rand = new Random();

        if(message.getStatus().equals(Status.MESSAGE))
        {
            message = chatService.addMessage(message);
        }
        else if (message.getStatus().equals(Status.DELETE_MESSAGE))
        {
            chatService.deleteMessage(message);
        }
        else if (message.getStatus().equals(Status.EDIT_MESSAGE))
        {
            message = chatService.editMessage(message);
        }
        else
        {
            message.setTimestamp(LocalDateTime.now().toString());
            message.setId(rand.nextInt() + "");
        }
        simpMessagingTemplate.convertAndSend("/chatroom/" + message.getChannelId(), message);
        return message;
    }

}
