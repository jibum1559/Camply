package com.camply.shop.mypage.admin.ordermanagement.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.mypage.admin.ordermanagement.dao.OrderManagementDAO;

@Service
public class OrderManagementService {

	@Autowired
	private OrderManagementDAO orderManagementDAO;
	
	//내 등록상품 주문조회
	public List<OrderVO> getOrderList(Long userId) {
		return orderManagementDAO.getOrderList(userId);
	}
	
	//주문조회 중 상품명으로 검색
	public List<OrderVO> getOrdersBySellerAndProductName(Long userId, String productName) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("productName", productName);
        return orderManagementDAO.selectOrdersBySellerAndProductName(params);
    }

	//주문조회 중 주문자명으로 검색
	public List<OrderVO> selectOrdersBySellerAndOrderName(Long userId, String orderOrdererName) {
		Map<String, Object> params = new HashMap<>();
		params.put("userId", userId);
		params.put("orderOrdererName", orderOrdererName);
		return orderManagementDAO.selectOrdersBySellerAndOrderName(params);
	}
	
	public List<OrderVO> selectOrderByOrderNo(Long userId, int orderNo) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("userId", userId);
	    params.put("orderNo", orderNo);
	    return orderManagementDAO.selectOrderByOrderNo(params);
	}

}