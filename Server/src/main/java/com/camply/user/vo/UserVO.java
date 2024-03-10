package com.camply.user.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserVO{
	
	@JsonProperty("USER_ID")
	private Long USER_ID;

	@JsonProperty("USER_EMAIL")
	private String USER_EMAIL;
	
	@JsonProperty("USER_PASSWORD")
	private String USER_PASSWORD;
	
	@JsonProperty("USER_NAME")
	private String USER_NAME;
	
	@JsonProperty("USER_NICKNAME")
	private String USER_NICKNAME;

	@JsonProperty("USER_ADDRESS")
	private String USER_ADDRESS;
	
	@JsonProperty("USER_TYPE")
	private String USER_TYPE;

	@JsonProperty("USER_BUSINESSADDRESS")
	private String USER_BUSINESSADDRESS;
	
	@JsonProperty("USER_BUSINESSNUMBER")
	private String USER_BUSINESSNUMBER;

	@JsonProperty("USER_BUSINESSPHONE")
	private String USER_BUSINESSPHONE;

	public Long getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(Long USER_ID) {
		this.USER_ID = USER_ID;
	}

	public String getUSER_EMAIL() {
		return USER_EMAIL;
	}

	public void setUSER_EMAIL(String USER_EMAIL) {
		this.USER_EMAIL = USER_EMAIL;
	}

	public String getUSER_PASSWORD() {
		return USER_PASSWORD;
	}

	public void setUSER_PASSWORD(String USER_PASSWORD) {
		this.USER_PASSWORD = USER_PASSWORD;
	}

	public String getUSER_NAME() {
		return USER_NAME;
	}

	public void setUSER_NAME(String USER_NAME) {
		this.USER_NAME = USER_NAME;
	}

	public String getUSER_NICKNAME() {
		return USER_NICKNAME;
	}

	public void setUSER_NICKNAME(String USER_NICKNAME) {
		this.USER_NICKNAME = USER_NICKNAME;
	}

	public String getUSER_ADDRESS() {
		return USER_ADDRESS;
	}

	public void setUSER_ADDRESS(String USER_ADDRESS) {
		this.USER_ADDRESS = USER_ADDRESS;
	}

	public String getUSER_TYPE() {
		return USER_TYPE;
	}

	public void setUSER_TYPE(String USER_TYPE) {
		this.USER_TYPE = USER_TYPE;
	}

	public String getUSER_BUSINESSADDRESS() {
		return USER_BUSINESSADDRESS;
	}

	public void setUSER_BUSINESSADDRESS(String USER_BUSINESSADDRESS) {
		this.USER_BUSINESSADDRESS = USER_BUSINESSADDRESS;
	}

	public String getUSER_BUSINESSNUMBER() {
		return USER_BUSINESSNUMBER;
	}

	public void setUSER_BUSINESSNUMBER(String USER_BUSINESSNUMBER) {
		this.USER_BUSINESSNUMBER = USER_BUSINESSNUMBER;
	}

	public String getUSER_BUSINESSPHONE() {
		return USER_BUSINESSPHONE;
	}

	public void setUSER_BUSINESSPHONE(String USER_BUSINESSPHONE) {
		this.USER_BUSINESSPHONE = USER_BUSINESSPHONE;
	}
}