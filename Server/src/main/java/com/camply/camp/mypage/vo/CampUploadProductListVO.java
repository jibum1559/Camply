package com.camply.camp.mypage.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 판매자가 업로드한 게시물 리스트
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampUploadProductListVO {

	// 사용자번호
	@JsonProperty("USER_ID")
	private Long USER_ID;
	// 게시물번호
	@JsonProperty("CAMP_ID")
	private Long CAMP_ID;	
	// 상품이름
	@JsonProperty("CAMP_NAME")
	private String CAMP_NAME;
	// 지역
	@JsonProperty("CAMP_LOCATION")
	private String CAMP_LOCATION;
	// 가격
	@JsonProperty("CAMP_PRICE")
	private String CAMP_PRICE;
	// 사진
	@JsonProperty("CAMP_IMAGES")
	private String CAMP_IMAGES;
	
}
