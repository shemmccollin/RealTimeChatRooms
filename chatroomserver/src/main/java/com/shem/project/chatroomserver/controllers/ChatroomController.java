package com.shem.project.chatroomserver.controllers;

import com.shem.project.chatroomserver.models.Chatroom;
import com.shem.project.chatroomserver.models.Message;
import com.shem.project.chatroomserver.models.Statistics;
import com.shem.project.chatroomserver.services.ChatService;
import com.shem.project.chatroomserver.services.ChatroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path= "api/v1/chatroom")
public class ChatroomController {

    @Autowired
    private ChatroomService chatroomService;

    @Autowired
    private ChatService chatService;

    @GetMapping(path = "/getchannels")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Chatroom>> getChannels(){
        return new ResponseEntity<>(chatroomService.GetChannels(), HttpStatus.OK) ;
    }

    @GetMapping(path = "/getmessages/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String id){
        return new ResponseEntity<>(chatService.getMessages(id), HttpStatus.OK) ;
    }

    @GetMapping(path = "/getchannel/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Optional<Chatroom>> getChannelsLike(@PathVariable String id){
        // For testing purposes
        System.out.println(id);
        return new ResponseEntity<>(chatroomService.GetChannel(id), HttpStatus.OK) ;
    }

    @GetMapping(path = "/getstats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Statistics> getStats(){
        return new ResponseEntity<>(chatroomService.GetStats(), HttpStatus.OK) ;
    }
}
