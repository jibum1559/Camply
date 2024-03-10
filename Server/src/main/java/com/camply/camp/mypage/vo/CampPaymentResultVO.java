package com.camply.camp.mypage.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 사용자의 결제 내역 페이지
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampPaymentResultVO {

	// 결제 번호 
	@JsonProperty("CAMP_RESERVATION")
    private Long CAMP_RESERVATION;
	// 사용자번호
	@JsonProperty("USER_ID")
    private Long USER_ID;
	// 상품이름
	@JsonProperty("CAMP_NAME")
    private String CAMP_NAME;
	// 체크인 날짜
	@JsonProperty("CAMP_CHECKIN")
    private Date CAMP_CHECKIN;
	// 체크아웃 날짜
	@JsonProperty("CAMP_CHECKOUT")
    private Date CAMP_CHECKOUT;
	// 결제 완료 시간
	@JsonProperty("COMPLETE_PAYMENT")
    private Date COMPLETE_PAYMENT;
	// 상품 결제 가격
	@JsonProperty("TOTAL_PRICE")
    private String TOTAL_PRICE;
}
