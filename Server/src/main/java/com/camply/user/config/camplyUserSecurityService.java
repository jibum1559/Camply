package com.camply.user.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.camply.user.dao.UserDao;
import com.camply.user.vo.UserVO;

import lombok.RequiredArgsConstructor;

@Configuration
@Service
@RequiredArgsConstructor
public class camplyUserSecurityService implements UserDetailsService {

	private final UserDao Userdao;

	public UserDetails loadUserByUsername(String USER_EMAIL) throws UsernameNotFoundException {

		UserVO uservo = Userdao.selectEmail(USER_EMAIL);
		
		if (uservo == null) {
			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
		}
		
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		if ("Admin".equals(uservo.getUSER_TYPE())) {
			authorities.add(new SimpleGrantedAuthority("Admin"));
		} else {
			authorities.add(new SimpleGrantedAuthority("General"));
		}
		return new User(uservo.getUSER_EMAIL(), uservo.getUSER_PASSWORD(), authorities);
	}

}