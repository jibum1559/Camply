package com.camply.shop.mypage.general.myorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.mypage.general.myorder.service.MyOrderService;

@RestController
@RequestMapping("/shop/mypage/general/myorder")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class MyOrderController {

	@Autowired
	private MyOrderService myOrderService;

	// 내주문 조회
	@GetMapping("/view/{userId}")
	public ResponseEntity<List<OrderVO>> viewMyOrder(@PathVariable Long userId) {
		List<OrderVO> order = myOrderService.viewMyOrder(userId);
		if (order != null) {
			return ResponseEntity.ok(order);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 내주문 수정
	@PatchMapping("/update")
	public void updateMyOrder(@PathVariable int orderNo) {
		myOrderService.updateMyOrder(orderNo);
	}

	// 내주문 삭제
	@DeleteMapping("/delete/{orderNo}")
	public void deleteMyOrder(@PathVariable int orderNo) {
		myOrderService.deleteMyOrder(orderNo);
	}
}
