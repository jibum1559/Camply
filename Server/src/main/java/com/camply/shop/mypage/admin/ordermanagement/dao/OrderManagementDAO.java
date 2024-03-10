package com.camply.shop.mypage.admin.ordermanagement.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.camply.shop.common.vo.OrderVO;

@Mapper
public interface OrderManagementDAO {
	
	//내 등록상품 주문조회
	List<OrderVO> getOrderList(@Param("userId") Long userId);

	//주문조회 중 상품명으로 검색
	List<OrderVO> selectOrdersBySellerAndProductName(Map<String, Object> params);

	//주문조회 중 주문자명으로 검색
	List<OrderVO> selectOrdersBySellerAndOrderName(Map<String, Object> params);

	//주문조회 중 주문자명으로 검색
	List<OrderVO> selectOrderByOrderNo(Map<String, Object> params);
}
	