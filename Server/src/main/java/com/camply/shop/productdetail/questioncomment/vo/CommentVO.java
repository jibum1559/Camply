package com.camply.shop.productdetail.questioncomment.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentVO {

	private int commentNo;
	private int questionNo;
	private String commentText;
	private LocalDateTime commentDate;
}
