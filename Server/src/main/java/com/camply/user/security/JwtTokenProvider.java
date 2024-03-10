package com.camply.user.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import com.camply.user.service.UserService;
import com.camply.user.vo.UserVO;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    @Autowired
    private UserService userService;

    private final Key key;

//    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
//    	byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        this.key = Keys.hmacShaKeyFor(keyBytes);
//    }
    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded());
    }

    public String generateToken(Authentication authentication) {
        String email = getEmailFromAuthentication(authentication);
        if (StringUtils.isEmpty(email) || authentication.getAuthorities() == null) {
            throw new RuntimeException("Invalid authentication details");
        }

        UserVO userVO = userService.getUserVOByUsername(authentication.getName());
        Long userId = userService.getUserIdFromUserVO(userVO);

        StringBuilder roles = new StringBuilder();
        authentication.getAuthorities().forEach(authority -> roles.append(authority.getAuthority()).append(","));

        Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));

        return Jwts.builder()
                .setSubject("AccessToken")
                .claim("email", email)
                .claim("user_id", userId)
                .claim("auth", roles.toString())
                .claim("USER_NAME", userVO.getUSER_NAME())
                .claim("USER_NICKNAME", userVO.getUSER_NICKNAME())
                .claim("USER_ADDRESS", userVO.getUSER_ADDRESS())
                .claim("USER_BUSINESSADDRESS", userVO.getUSER_BUSINESSADDRESS())
                .claim("USER_BUSINESSNUMBER", userVO.getUSER_BUSINESSNUMBER())
                .claim("USER_BUSINESSPHONE", userVO.getUSER_BUSINESSPHONE())
                .setExpiration(tokenExpiresDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private String getEmailFromAuthentication(Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            return ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }
        return null;
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims.get("user_id", Long.class); // 클레임에서 "user_id"를 Long 타입으로 추출
    }

}

