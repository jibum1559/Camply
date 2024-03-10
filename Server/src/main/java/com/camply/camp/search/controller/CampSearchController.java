package com.camply.camp.search.controller;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.search.service.CampSearchService;
import com.camply.camp.search.vo.CampSearchVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/camp/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")

public class CampSearchController {

	private final CampSearchService campsearchsearvice;
	
	@PostMapping("/campList")
	public ResponseEntity<?> searchCampList(@RequestBody CampSearchVO campsearchvo) {
		
		try {

			ArrayList<CampSearchVO> campList = campsearchsearvice.campList(campsearchvo);

			if (campList != null) {
	
				return ResponseEntity.ok(campList);
				
			} else {
				
				return ResponseEntity.ok("일치하는 데이터가 없습니다,");
				
			}
			
		} catch (Exception e) {

			return ResponseEntity.status(500).body(e + "	: 데이터 요청에 실패 하였습니다.");
		}
	}
}
