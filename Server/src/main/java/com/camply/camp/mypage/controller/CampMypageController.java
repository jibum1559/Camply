package com.camply.camp.mypage.controller;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.mypage.service.CampMypageService;
import com.camply.camp.mypage.vo.CampDipsListVO;
import com.camply.camp.mypage.vo.CampPaymentResultVO;
import com.camply.camp.mypage.vo.CampUploadProductListVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/camp/Mypage")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class CampMypageController {
	
	private final CampMypageService campmypageservice;
	
	// 결재완료 내역 조회
	@PostMapping("/paymentResult")
	public ResponseEntity<?> paymentResultList(@RequestBody CampPaymentResultVO resultvo){
		try {
			
			ArrayList<CampPaymentResultVO> resultList = campmypageservice.resultList(resultvo);
			
			if (resultList != null) {
				
				return ResponseEntity.ok(resultList);
				
			} else {
				
				return ResponseEntity.ok("예약된 정보가 없습니다.");
				
			}
			
		} catch (Exception e) {

			return ResponseEntity.status(500).body(e + "	: 데이터 요청에 실패 하였습니다.");
		}
	}
	
	// 업로드 내역 조회
	@PostMapping("/campUploadList")
	public ResponseEntity<?> uploadCampList(@RequestBody CampUploadProductListVO uploadlistvo) {
		
		try {
			
			ArrayList<CampUploadProductListVO> uploadList = campmypageservice.uploadProduectList(uploadlistvo);
			
			if (uploadList != null) {
				
				return ResponseEntity.ok(uploadList);
				
			} else {
				
				return ResponseEntity.ok("업로드된 내역이 없습니다.");
				
			}
			
			
		} catch (Exception e) { 
			
			return ResponseEntity.status(500).body(e + "	: 데이터 요청에 실패 하였습니다.");
			
		}
	}
	
	// 좋아요 리스트 조회
	@PostMapping("/campDipsList")
	public ResponseEntity<?> dipsList(@RequestBody CampDipsListVO dipslistvo) {

		System.out.println("code check : -1 ");
		
		try {
			System.out.println("code check dipslistvo :  " + dipslistvo.getUSER_ID());
			
			ArrayList<CampDipsListVO> dipsList = campmypageservice.dipsList(dipslistvo);
			
			System.out.println("code check : 1 ");
			if (dipsList != null) {

				return ResponseEntity.ok(dipsList);
				
			} else {

				System.out.println("code check : 2 ");
				return ResponseEntity.ok("좋아요를 누른 게시물이 없습니다.");
				
			}
			
		} catch (Exception e) { 

			System.out.println("code check : 4 ");
			return ResponseEntity.status(500).body(e + "	: 데이터 요청에 실패 하였습니다.");
				
		}
	}

}
