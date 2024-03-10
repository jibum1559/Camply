package com.camply.shop.productdetail.questioncomment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.productdetail.questioncomment.dao.CommentDao;
import com.camply.shop.productdetail.questioncomment.vo.CommentVO;

@Service
public class CommentService {

	@Autowired
	private CommentDao commentDao;

	// 댓글 조회
	public List<CommentVO> getComment(int questionNo) {
		return commentDao.getComment(questionNo);
	}

	// 댓글 작성
	public void postComment(CommentVO commentVO) {
		commentDao.insertComment(commentVO);
	}
}
