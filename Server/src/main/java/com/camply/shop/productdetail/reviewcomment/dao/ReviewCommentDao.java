package com.camply.shop.productdetail.reviewcomment.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.reviewcomment.vo.ReviewCommentVO;

@Mapper
public interface ReviewCommentDao {

	// 댓글 조회
	List<ReviewCommentVO> getComment(int commentNo);

	// 댓글 작성
	void insertComment(ReviewCommentVO commentVO);
}
