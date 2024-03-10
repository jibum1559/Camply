package com.camply.shop.productdetail.reviewcomment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.productdetail.reviewcomment.dao.ReviewCommentDao;
import com.camply.shop.productdetail.reviewcomment.vo.ReviewCommentVO;

@Service
public class ReviewCommentService {

	@Autowired
	private ReviewCommentDao reviewCommentDao;

	// 댓글 조회
	public List<ReviewCommentVO> getComment(int commentNo) {
		return reviewCommentDao.getComment(commentNo);
	}

	// 댓글 작성
	public void postComment(ReviewCommentVO commentVO) {
		reviewCommentDao.insertComment(commentVO);
	}
}
