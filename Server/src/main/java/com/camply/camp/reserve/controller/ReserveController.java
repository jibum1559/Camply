package com.camply.camp.reserve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.reserve.service.ReserveService;
import com.camply.camp.reserve.vo.ReserveVO;

@RestController
@RequestMapping("/camp")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class ReserveController {

	@Autowired
	private ReserveService reserveservice;
	
	@PostMapping("/reserve")
	public ResponseEntity<String> reserveCamp(@RequestBody ReserveVO reserveVO) {
		
		try {

			System.out.println("ReserveController USER_ID : " + reserveVO.getUSER_ID());
			System.out.println("ReserveController CAMP_CHECKIN : " + reserveVO.getCAMP_CHECKIN());
			System.out.println("ReserveController CAMP_CHECKOUT : " + reserveVO.getCAMP_CHECKOUT());
			System.out.println("ReserveController ALLOWED_USERS_ADULT : " + reserveVO.getALLOWED_USERS_ADULT());
			System.out.println("ReserveController ALLOWED_USERS_CHILD : " + reserveVO.getALLOWED_USERS_CHILD());
			System.out.println("ReserveController COMPLETE_PAYMENT : " + reserveVO.getCOMPLETE_PAYMENT());
			System.out.println("ReserveController CAMP_USER_PHONE : " + reserveVO.getCAMP_USER_PHONE());
			System.out.println("ReserveController CAMP_USER_EMAIL : " + reserveVO.getCAMP_USER_EMAIL());
			System.out.println("ReserveController CAMP_ID : " + reserveVO.getCAMP_ID());
			System.out.println("ReserveController CAMP_NAME : " + reserveVO.getCAMP_NAME());
			System.out.println("ReserveController CAMP_PRICE : " + reserveVO.getTOTAL_PRICE());
	        
			reserveservice.insertReserveCamp(reserveVO);
			return ResponseEntity.ok("insert Success");
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("reserve Error: " + e.getMessage());
		}
	}
	
	
}
