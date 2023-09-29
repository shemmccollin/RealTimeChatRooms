package com.shem.project.chatroomserver.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private EnumRole name;
}
