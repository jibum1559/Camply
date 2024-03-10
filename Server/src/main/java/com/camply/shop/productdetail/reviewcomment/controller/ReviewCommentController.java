package com.camply.shop.productdetail.reviewcomment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.productdetail.reviewcomment.service.ReviewCommentService;
import com.camply.shop.productdetail.reviewcomment.vo.ReviewCommentVO;

@RestController
@RequestMapping("/shop/review/comment")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class ReviewCommentController {
	@Autowired
	private ReviewCommentService reviewCommentService;

	// 리뷰 댓글 조회
	@GetMapping("/list/{commentNo}")
	public ResponseEntity<List<ReviewCommentVO>> getReview(@PathVariable int commentNo) {
		List<ReviewCommentVO> reviewCommentVO = reviewCommentService.getComment(commentNo);
		if (reviewCommentVO != null) {
			return ResponseEntity.ok(reviewCommentVO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 리뷰 댓글 작성
	@PostMapping("/post")
	public ResponseEntity<String> postComment(@RequestBody ReviewCommentVO reviewCommentVO) {
		reviewCommentService.postComment(reviewCommentVO);
		return ResponseEntity.ok("Success");
	}
}
