package com.camply.camp.search.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampReservationSearchVO {

	@JsonProperty("CAMP_ID")
    private Long CAMP_ID;
	
	@JsonProperty("CAMP_CHECKIN")
    private Date CAMP_CHECKIN;
	
	@JsonProperty("CAMP_CHECKOUT")
    private Date CAMP_CHECKOUT;
}
