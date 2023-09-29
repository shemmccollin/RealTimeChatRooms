package com.shem.project.chatroomserver.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatrooms")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Chatroom {
    @Id
    private String id;
    private String channel;
    private Status status;
    private String timestamp;

}
