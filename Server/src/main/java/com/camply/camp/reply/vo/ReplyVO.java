package com.camply.camp.reply.vo;

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
public class ReplyVO {
    private Long camp_reviewnumber;
    private Long camp_id;
    private Long user_id;
    private double camp_rating;
    private String camp_review;
}

