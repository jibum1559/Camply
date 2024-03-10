package com.camply.shop.category.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.ProductVO;

@Mapper
public interface CategoryDao {
	
	// 카테고리페이지
	List<ProductVO> getCategory(String productCategory);
}
