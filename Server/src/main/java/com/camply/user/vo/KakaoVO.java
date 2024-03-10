package com.camply.user.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class KakaoVO{

    private String email;
    private String name;
    private String nickname;
    private String userType;
    private String access_token;


}
