package com.shem.project.chatroomserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Statistics {
    private long noUsers;
    private long noChannels;
    private long noMessages;
}
