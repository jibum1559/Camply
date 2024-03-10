package com.camply.shop.mypage.admin.productmanagement.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.mypage.admin.productmanagement.dao.ProductManagementDAO;

@Service
public class ProductManagementService {
	
	@Autowired
	private ProductManagementDAO productManagementDAO;
	
	//상품 등록
	public void insertProduct(ProductVO productVO, Long userId) {
        // 상품 코드 생성 로직
        String productCode = generateProductCode(productVO.getProductCategory(), userId);
        productVO.setProductCode(productCode);
        
        productVO.setProductCreateDate(LocalDate.now());
        
        productManagementDAO.insertProduct(productVO);
    }
    
    private String generateProductCode(String category, Long userId) {
        String categoryCode = mapCategoryToCode(category);
        
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = LocalDate.now().format(dtf);
        
        int productCount = productManagementDAO.getUserProductCount(userId);
        long orderNumber = productCount + 1; // 다음 등록될 상품의 순번
        
        return categoryCode + formattedDate + userId + String.format("%05d", orderNumber);
    }
    
    public int getUserProductCount(Long userId) {
        return productManagementDAO.getUserProductCount(userId);
    }
    
    private String mapCategoryToCode(String category) {
        Map<String, String> categoryCodes = new HashMap<>();
        categoryCodes.put("tent", "TEN");
        categoryCodes.put("sleepingbag", "SLB");
        categoryCodes.put("lamp", "LAM");
        categoryCodes.put("fireplace", "FIR");
        categoryCodes.put("chair", "CHA");
        categoryCodes.put("kitchen", "KIT");
        return categoryCodes.getOrDefault(category, "OTH");
    }


	
	
	//등록 상품 리스트 조회
	public List<ProductVO> getAllProductsByUserId(@Param("userId") Long userId) {
        return productManagementDAO.getAllProductsByUserId(userId);
	}
	
	//단일 상품 조회
	 public ProductVO getProductById(@Param("productId") Long productId, @Param("userId") Long userId) {
	    return productManagementDAO.getProductById(productId, userId);
	 }
	
	//등록 상품 수정
	public void updateProduct(@Param("productVO") ProductVO productVO, @Param("userId") Long userId) {
		productManagementDAO.updateProduct(productVO, userId);
	}
	
	//등록상품 상태 수정
	public void statusUpdateProduct(@Param("productId") Long productId, @Param("status") String productStatus, @Param("userId") Long userId) {
		productManagementDAO.statusUpdateProduct(productId, productStatus, userId);
	}
	
	
	//등록 상품 삭제
	public void deleteProduct(@Param("productId") Long productId, @Param("userId") Long userId) {
		productManagementDAO.deleteProduct(productId, userId);
	}
	
	
	
}