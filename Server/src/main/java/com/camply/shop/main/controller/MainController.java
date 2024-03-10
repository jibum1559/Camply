package com.camply.shop.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.main.service.MainService;

@RestController
@RequestMapping("/shop/main")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class MainController {
	@Autowired
	private MainService mainService;

	// 메인페이지에서 ID값 기준으로 썸네일 노출시키는 컨트롤러 값
	@GetMapping("/view/{productId}")
	public ResponseEntity<ProductVO> getMainThumnail(@PathVariable int productId) {
		ProductVO product = mainService.getMain(productId);

		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	// 메인페이지에 검색 진행하는 컨트롤러 값
	@GetMapping("/search/{productName}")
	public ResponseEntity<List<ProductVO>> searchMain(@PathVariable String productName) {
		List<ProductVO> product = mainService.searchMain(productName);

		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	// 메인페이지에서 카테고리별로 썸네일 노출하는 컨트롤러 값
	@GetMapping("/category/{productCategory}")
	public ResponseEntity<List<ProductVO>> getMainCategory(@PathVariable String productCategory) {
		List<ProductVO> product = mainService.getMainCategory(productCategory);

		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
