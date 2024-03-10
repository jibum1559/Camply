package com.camply.shop.productdetail.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.ProductVO;

@Mapper
public interface ProductDetailDao {
	// 상품 상세페이지 자료 가져오는 DAO값
	ProductVO getProductById(int productId);
	
}
