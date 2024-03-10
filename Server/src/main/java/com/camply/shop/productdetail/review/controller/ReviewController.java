package com.camply.shop.productdetail.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.productdetail.review.service.ReviewService;
import com.camply.shop.productdetail.review.vo.ReviewVO;

@RestController
@RequestMapping("/shop/review")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	// 후기글 전체 조회
	@GetMapping("/all")
	public ResponseEntity<List<ReviewVO>> getAllReview() {
		List<ReviewVO> review = reviewService.getAllReview();
		return ResponseEntity.ok(review);
	}

	// 후기 조회
	@GetMapping("/view/{productId}")
	public ResponseEntity<List<ReviewVO>> getReview(@PathVariable int productId) {
		List<ReviewVO> reviewVO = reviewService.getReview(productId);

		if (reviewVO != null) {
			return ResponseEntity.ok(reviewVO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 업데이트용 후기 조회
	@GetMapping("/{reviewNo}")
	public ResponseEntity<ReviewVO> getReviewNo(@PathVariable int reviewNo) {
		reviewService.incrementReviewHit(reviewNo);
		ReviewVO reviewVO = reviewService.getReviewNo(reviewNo);

		if (reviewVO != null) {
			return ResponseEntity.ok(reviewVO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 후기 작성
	@PostMapping("/post")
	public ResponseEntity<String> postComment(@RequestBody ReviewVO reviewVO) {
		reviewService.postReview(reviewVO);
		return ResponseEntity.ok("Success");
	}

	// 후기 수정
	@PatchMapping("/update/{reviewNo}")
	public ResponseEntity<String> updateReview(@PathVariable int reviewNo, @RequestBody ReviewVO reviewVO) {
		reviewVO.setReviewNo(reviewNo);
		reviewService.reviewUpdate(reviewVO);
		return ResponseEntity.ok("Review update succesfully");
	}

	// 후기 삭제
	@DeleteMapping("/delete/{reviewNo}")
	public void deleteReview(@PathVariable int reviewNo) {
		reviewService.reviewDelete(reviewNo);
	}
}
