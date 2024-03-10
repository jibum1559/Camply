package com.camply.shop.category.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.category.dao.CategoryDao;
import com.camply.shop.common.vo.ProductVO;

@Service
public class CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	// 카테고리 썸네일 노출
	public List<ProductVO> getCategory(String productCategory) {
		return categoryDao.getCategory(productCategory);
	}
}
