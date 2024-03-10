package com.camply.camp.dips.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DipsVO {
	
	// 좋아요를 누른 사용자 번호
	@JsonProperty("USER_ID")
    private Long USER_ID;
	// 게시물 번호
	@JsonProperty("CAMP_ID")
    private Long CAMP_ID;
	
	// 좋아요 상태
	@JsonProperty("STATUS")
    private boolean STATUS;
}
