package com.camply.shop.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.order.service.OrderService;

@RestController
@RequestMapping("/shop/order")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping("/post")
	public ResponseEntity<String> postOrder(@RequestBody OrderVO orederVO) {
		orderService.postOrder(orederVO);
		return ResponseEntity.ok("success");
	}
}
