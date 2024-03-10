package com.camply.shop.main.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.ProductVO;

@Mapper
public interface MainDao {
	// 메인페이지
	ProductVO getMain(int productId);

	// 메인페이지에서 검색
	List<ProductVO> searchMain(String productName);

	// 메인페이지에서 카테고리
	List<ProductVO> getMainCategory(String productCategory);
}
