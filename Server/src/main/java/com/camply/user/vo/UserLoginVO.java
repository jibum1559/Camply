package com.camply.user.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginVO {
    private Long USER_ID;
    private String USER_EMAIL;
    private String USER_PASSWORD;
}