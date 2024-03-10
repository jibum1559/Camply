package com.camply.shop.productdetail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.productdetail.dao.ProductDetailDao;

@Service
public class ProductDetailService {

	@Autowired
	private ProductDetailDao productDetialDao;

	// 상품 상세페이지
	public ProductVO getProductById(int productId) {
		return productDetialDao.getProductById(productId);
	}
}
