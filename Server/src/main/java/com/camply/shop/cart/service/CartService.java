package com.camply.shop.cart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.cart.dao.CartDao;
import com.camply.shop.cart.vo.CartVO;
import com.camply.shop.common.vo.ProductVO;

@Service
public class CartService {

	@Autowired
	private CartDao cartDao;

	// 상품 정복 가져오기
	public ProductVO getProduct(int productId) {
		return cartDao.getProduct(productId);
	}

	// 장바구니 정보 저장
	public void insertCart(CartVO cartVO) {
		cartDao.insertCart(cartVO);
	}
	
	//내 장바구니 정보 보기
	public List<CartVO> getCart(Long userId){
		return cartDao.getCart(userId);
	}
	
	//내 장바구니 삭제
	public void deleteCart(int cartId) {
		cartDao.deleteCart(cartId);
	}
}
