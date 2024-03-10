package com.camply.shop.productdetail.questioncomment.controller;

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

import com.camply.shop.productdetail.questioncomment.service.CommentService;
import com.camply.shop.productdetail.questioncomment.vo.CommentVO;

@RestController
@RequestMapping("/shop/question/comment")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class CommentController {

	@Autowired
	private CommentService commentService;

	// 댓글 조회
	@GetMapping("/list/{questionNo}")
	public ResponseEntity<List<CommentVO>> getComment(@PathVariable int questionNo) {
		List<CommentVO> comment = commentService.getComment(questionNo);
		if (comment != null) {
			return ResponseEntity.ok(comment);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 댓글 작성
	@PostMapping("/post")
	public ResponseEntity<String> postComment(@RequestBody CommentVO commentVO) {
		commentService.postComment(commentVO);
		return ResponseEntity.ok("Success");
	}

}
