package com.camply.shop.order.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.productdetail.questioncomment.vo.CommentVO;

@Mapper
public interface OrderDao {

	// 주문 작성
	void insertOrder(OrderVO orderVO);
}
