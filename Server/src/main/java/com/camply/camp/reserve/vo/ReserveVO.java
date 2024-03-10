package com.camply.camp.reserve.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReserveVO {
	
	@JsonProperty("USER_ID")
	private Long USER_ID;

	@JsonProperty("CAMP_CHECKIN")
	private Date CAMP_CHECKIN;

	@JsonProperty("CAMP_CHECKOUT")
	private Date CAMP_CHECKOUT;

	@JsonProperty("ALLOWED_USERS_ADULT")
	private Long ALLOWED_USERS_ADULT;

	@JsonProperty("ALLOWED_USERS_CHILD")
	private Long ALLOWED_USERS_CHILD;

	@JsonProperty("COMPLETE_PAYMENT")
	private Date COMPLETE_PAYMENT;

	@JsonProperty("CAMP_USER_PHONE")
	private String CAMP_USER_PHONE;

	@JsonProperty("CAMP_USER_EMAIL")
	private String CAMP_USER_EMAIL;

	@JsonProperty("CAMP_ID")
	private Long CAMP_ID;

	@JsonProperty("TOTAL_PRICE")
	private String TOTAL_PRICE;

	@JsonProperty("CAMP_NAME")
	private String CAMP_NAME;

}