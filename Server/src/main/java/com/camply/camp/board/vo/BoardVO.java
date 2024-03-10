package com.camply.camp.board.vo;

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
public class BoardVO {
    private Long camp_id;
    private Long user_id;
    private String camp_select;
    private String camp_location;
    private String camp_name;
    private String camp_address;
    private String camp_phone;
    private Long camp_adult;
    private Long camp_child;
    private Long camp_price;
    private String camp_images;
    private String camp_description;
    private String camp_facility;

}
