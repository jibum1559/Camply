package com.camply.shop.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.category.service.CategoryService;
import com.camply.shop.common.vo.ProductVO;

@RestController
@RequestMapping("/shop/category")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;

	// 카테고리페이지에 썸네일 노출시키는 컨트롤러 값
	@GetMapping("/main/{productCategory}")
	public ResponseEntity<List<ProductVO>> getCategoryThumnail(@PathVariable String productCategory) {
		List<ProductVO> product = categoryService.getCategory(productCategory);

		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}

	}
}
