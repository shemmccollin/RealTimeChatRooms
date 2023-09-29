package com.shem.project.chatroomserver.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;
@NoArgsConstructor
@AllArgsConstructor()
@Data
@Getter
@Setter
@ToString
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank
    @Size(max = 20)
    @Indexed(unique = true)
    private String username;

    @NotBlank
    @Size(max=50)
    @Email
    @Indexed(unique = true)
    private String email;

    @NotBlank
    @Size(max=40)
    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
