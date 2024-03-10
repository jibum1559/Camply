package com.camply.camp.mypage.vo;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 사용자가 좋아요를 누른 상품의 리스트
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampDipsListVO {

	// 사용자번호
	@JsonProperty("USER_ID")
	private Long USER_ID;

	private ArrayList<CampDipsProductListVO> CampDipsProductList;
	
}
