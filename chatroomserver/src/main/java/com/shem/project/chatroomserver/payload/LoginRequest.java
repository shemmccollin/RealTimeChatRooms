package com.shem.project.chatroomserver.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginRequest {
    @NotBlank
    @Size(min = 2, max = 20)
    private String username;
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
