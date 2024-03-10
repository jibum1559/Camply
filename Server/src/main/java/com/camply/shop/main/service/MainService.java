package com.camply.shop.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.main.dao.MainDao;

@Service
public class MainService {
	@Autowired
	private MainDao mainDao;

	// 메인페이지
	public ProductVO getMain(int productId) {
		return mainDao.getMain(productId);
	}

	public List<ProductVO> searchMain(String productName) {
		return mainDao.searchMain(productName);
	}

	public List<ProductVO> getMainCategory(String productCategory) {
		return mainDao.getMainCategory(productCategory);
	}

}
