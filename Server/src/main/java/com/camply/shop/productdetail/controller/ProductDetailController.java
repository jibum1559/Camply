package com.camply.shop.productdetail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.productdetail.service.ProductDetailService;

@RestController
@RequestMapping("/shop/detail")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class ProductDetailController {

	@Autowired
	private ProductDetailService productDetailService;

	@GetMapping("/{productId}")
	public ResponseEntity<ProductVO> getProductById(@PathVariable int productId) {
		ProductVO product = productDetailService.getProductById(productId);
		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}