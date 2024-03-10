package com.camply.camp.dips.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.dips.service.DipsService;
import com.camply.camp.dips.vo.DipsVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/camp/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class DipsController {

	@Autowired
	private DipsService dipsService;
	
	// 찜하기 추가 및 삭제
	@PostMapping("/changDips")
	public ResponseEntity<String> changDips(@RequestBody DipsVO dipsvo) {

		if (!dipsvo.isSTATUS()) { 
	    	
			try {

				dipsService.addCampDips(dipsvo);

		    	
				return ResponseEntity.status(HttpStatus.CREATED).body("addlike");
			
			} catch (Exception e) {
		    
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e + "서버 오류 발생");
			
			}
		} else if (dipsvo.isSTATUS()) {

			try {
			    
				 dipsService.removeCampDips(dipsvo);
			     return ResponseEntity.status(HttpStatus.OK).body("deletelike");
			
			} catch (Exception e) {
		    
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
			
			}
	
		} else {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상테값 오류");

		}
	}
	
	// 찜하기 확인
	@PostMapping("/checkDips")
	public ResponseEntity<?> checkDips(@RequestBody DipsVO dipsvo) {

		try {
			
			DipsVO result = dipsService.selectCampDips(dipsvo);
			
			// 찜테이블에 값이 있을경우 true 반환
			if (result != null) {

			    return ResponseEntity.status(HttpStatus.OK).body(true);
			
			// 찜테이블에 값이 없을경우 false 반환  
			} else {

			    return ResponseEntity.status(HttpStatus.OK).body(false);
			}
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during checkDips: " + e.getMessage());
	
		}
	}

}