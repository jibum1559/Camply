package com.camply.shop.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.order.dao.OrderDao;

@Service
public class OrderService {

	@Autowired
	private OrderDao orderDao;

	// 주문 작성
	public void postOrder(OrderVO orderVO) {
		orderDao.insertOrder(orderVO);
	}

}
