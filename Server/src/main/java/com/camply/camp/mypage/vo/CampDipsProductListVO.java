package com.camply.camp.mypage.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampDipsProductListVO {

	// 게시물번호
	@JsonProperty("CAMP_ID")
	private Long CAMP_ID;	
	// 상품이름
	@JsonProperty("CAMP_NAME")
	private String CAMP_NAME;
	// 가격
	@JsonProperty("CAMP_PRICE")
	private String CAMP_PRICE;
	
}
