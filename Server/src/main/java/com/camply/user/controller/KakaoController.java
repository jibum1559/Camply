package com.camply.user.controller;

import com.camply.user.service.UserService;
import com.camply.user.vo.KakaoVO;
import com.camply.user.vo.UserVO;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
public class KakaoController {

    @Autowired
    private UserService userService;

    @PostMapping("/getKakaoUserData")
    public ResponseEntity<String> getKakaoUserData(@RequestBody KakaoVO kakaoData) {
        String email = kakaoData.getEmail();
        String name = kakaoData.getName();
        String nickname = kakaoData.getNickname();
        String userType = kakaoData.getUserType();
        String access_token = kakaoData.getAccess_token();

        Optional<UserVO> userExist = userService.getMember(email);

        if (userExist.isPresent()) {
            userService.getKakao(email);
            System.out.println("카카오 로그인: " + email);
        } else {
            UserVO userVO = new UserVO();
            userVO.setUSER_EMAIL(email);
            userVO.setUSER_NAME(name);
            userVO.setUSER_NICKNAME(nickname);
            userVO.setUSER_TYPE(userType);

            userService.kakaoRegister(userVO);
            System.out.println("카카오 회원가입: " + email);
            System.out.println("Email: " + email);
            System.out.println("Name: " + name);
            System.out.println("Nickname: " + nickname);
        }
        return ResponseEntity.ok("카카오 회원가입 성공");
    }
}


