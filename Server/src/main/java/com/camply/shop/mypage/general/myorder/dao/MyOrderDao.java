package com.camply.shop.mypage.general.myorder.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.OrderVO;

@Mapper
public interface MyOrderDao {

	// 내주문 조회
	List<OrderVO> viewMyOrder(Long userId);

	// 내주문 수정
	void updateMyOrder(int orderNo);

	// 내주문 삭제
	void deleteMyOrder(int orderNo);
}
