package com.camply.shop.mypage.admin.productmanagement.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.camply.shop.common.vo.ProductVO;

@Mapper
public interface ProductManagementDAO {
	
	//상품등록
	void insertProduct(ProductVO productVO);
	// 사용자별 등록된 상품 수 조회
    int getUserProductCount(Long userId);
    
	//등록 상품 리스트 조회
	List<ProductVO> getAllProductsByUserId(@Param("userId") Long userId);
	
	//단일 상품 조회
	ProductVO getProductById(int productId);
	
	// 단일 상품 조회
    // productId와 userId를 기준으로 단일 상품을 조회
    ProductVO getProductById(@Param("productId") Long productId, @Param("userId") Long userId);
    
    // 등록 상품 수정
    // userId도 매개변수로 추가하여 해당 사용자의 상품만 수정 가능하도록 함
    void updateProduct(@Param("productVO") ProductVO productVO, @Param("userId") Long userId);
    
    // 등록 상품 상태 수정
    // productId와 userId를 기준으로 상품의 상태만을 수정
    void statusUpdateProduct(@Param("productId") Long productId, @Param("productStatus") String productStatus, @Param("userId") Long userId);
    
    // 등록 상품 삭제
    // productId와 userId를 기준으로 해당 사용자의 상품만 삭제 가능하도록 함
    void deleteProduct(@Param("productId") Long productId, @Param("userId") Long userId);
    

}