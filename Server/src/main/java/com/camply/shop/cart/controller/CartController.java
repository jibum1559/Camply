package com.camply.shop.cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.cart.service.CartService;
import com.camply.shop.cart.vo.CartVO;
import com.camply.shop.common.vo.ProductVO;

@RestController
@RequestMapping("/shop/cart")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class CartController {

	@Autowired
	private CartService cartService;

	// 장바구니에 상품정보 가져오기
	@GetMapping("/{productId}")
	public ResponseEntity<ProductVO> getProduct(@PathVariable int productId) {
		ProductVO product = cartService.getProduct(productId);
		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 장바구니 값 넣기
	@PostMapping("/post")
	public ResponseEntity<String> insertCart(@RequestBody CartVO cartVO) {
		cartService.insertCart(cartVO);
		return ResponseEntity.ok("success");
	}
	
	//내 장바구니 상품보기
	@GetMapping("/mycart/{userId}")
	public ResponseEntity<List<CartVO>> getCart(@PathVariable Long userId){
		List<CartVO> cart = cartService.getCart(userId);
		if(cart != null) {
			return ResponseEntity.ok(cart);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	//내 장바구니 삭제
	@DeleteMapping("/delete/{cartId}")
	public void deleteCart(@PathVariable int cartId) {
		cartService.deleteCart(cartId);
	}
	
}
