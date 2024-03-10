package com.camply.user.controller;

import java.util.HashMap;
import java.util.Map;

import com.camply.camp.board.vo.BoardVO;
import com.camply.user.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;


import com.camply.user.service.UserService;
import com.camply.user.vo.UserVO;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class UserController {

	/**
	 * 회원가입
	 */
	@Autowired
	private UserService userservice;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;

	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@PostMapping("/general/register")
	public ResponseEntity<String> emailRegister(@RequestBody UserVO userVO) {
		try {
			userservice.registerUser(userVO);
			return ResponseEntity.ok("General email register Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
		}
	}

	@PostMapping("/admin/register")
	public ResponseEntity<String> adminRegister(@RequestBody UserVO userVO) {
		try {
			userservice.registerAdmin(userVO);
			return ResponseEntity.ok("Admin email register Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserVO userVO) {
		HashMap<String, String> user_info = new HashMap<>();

		UserVO camplyuservo_info = userservice.getMemberByUsername(userVO.getUSER_EMAIL());

		if (camplyuservo_info != null && passwordEncoder.matches(userVO.getUSER_PASSWORD(), camplyuservo_info.getUSER_PASSWORD())) {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(camplyuservo_info.getUSER_EMAIL(), userVO.getUSER_PASSWORD()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtTokenProvider.generateToken(authentication);

			user_info.put("USER_EMAIL", camplyuservo_info.getUSER_EMAIL());
			user_info.put("USER_TYPE", camplyuservo_info.getUSER_TYPE());
			user_info.put("token", token);

			// Return the token in the response
			return new ResponseEntity<>(user_info, HttpStatus.OK);
		} else {
			user_info.put("result", "FAIL");
			user_info.put("message", "이메일 혹은 비밀번호가 일치하지 않습니다.");
			return new ResponseEntity<>(user_info, HttpStatus.UNAUTHORIZED);
		}
	}

	@DeleteMapping("/delete/{user_id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long user_id) {
		try {
			userservice.deleteUserById(user_id);
			return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to delete user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get/{user_id}")
	public ResponseEntity<?> getUserById(@PathVariable Long user_id) {
		try {
			UserVO userVO = userservice.getUserById(user_id);
			return ResponseEntity.ok(userVO);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("유저 정보 가져오기 실패: " + user_id);
		}
	}

	@GetMapping("/kakao/{user_email}")
	public ResponseEntity<?> getUserById(@PathVariable String user_email) {
		try {
			UserVO userVO = userservice.getKakao(user_email);
			return ResponseEntity.ok(userVO);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("유저 정보 가져오기 실패: " + user_email);
		}
	}

	@PutMapping("/update/{user_id}")
	public void updateUserById(@PathVariable Long user_id, @RequestBody UserVO user) {
		user.setUSER_ID(user_id);
		userservice.updateUserById(user);
	}

}