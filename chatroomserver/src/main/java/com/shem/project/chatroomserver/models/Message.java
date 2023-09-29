package com.shem.project.chatroomserver.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Document(collection = "messages")
public class Message {

    @Id
    private String id;
    @Indexed
    private String channelId;
    private String sender;
    private String message;
    private Status status;
    private boolean edited;
    private String timestamp;
}
