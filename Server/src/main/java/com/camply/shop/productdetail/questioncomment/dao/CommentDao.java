package com.camply.shop.productdetail.questioncomment.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.questioncomment.vo.CommentVO;

@Mapper
public interface CommentDao {

	// 댓글 조회
	List<CommentVO> getComment(int questionNo);

	// 댓글 작성
	void insertComment(CommentVO commentVO);
}
