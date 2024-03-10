package com.camply.shop.productdetail.review.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.review.vo.ReviewVO;

@Mapper
public interface ReviewDao {

	// 후기 전체 조회
	List<ReviewVO> selectAllReview();

	// 후기 조회
	List<ReviewVO> getReview(int prodcutId);

	// 업데이트용 문의 조회
	ReviewVO selectUpdateReview(int reviewNo);

	// 후기 작성
	void insertReview(ReviewVO reviewVO);

	// 후기 조회수등가
	void incrementReviewHit(int reviewNo);

	// 후기 수정
	void updateReview(ReviewVO reviewVO);

	// 후기 삭제
	void deleteReview(int reviewNo);
}
