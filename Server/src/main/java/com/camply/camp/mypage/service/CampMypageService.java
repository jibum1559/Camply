package com.camply.camp.mypage.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.camply.camp.mypage.dao.CampMypageDao;
import com.camply.camp.mypage.vo.CampDipsListVO;
import com.camply.camp.mypage.vo.CampPaymentResultVO;
import com.camply.camp.mypage.vo.CampUploadProductListVO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CampMypageService {

	private final CampMypageDao campmypagedao;
	
	// 결제완료 리스트 Service
	public ArrayList<CampPaymentResultVO> resultList(CampPaymentResultVO resultvo) {
		
		return campmypagedao.pamentResultList(resultvo);
	
	}
	
	// 업록드 리스트 Service
	public ArrayList<CampUploadProductListVO> uploadProduectList(CampUploadProductListVO productlistvo) {
		
		return campmypagedao.uploadProductList(productlistvo);
		
	}
	
	// 좋아요 리스트 Service
	public ArrayList<CampDipsListVO> dipsList(CampDipsListVO dipslistvo) {
		
		return campmypagedao.dipsList(dipslistvo);
		
	}
	
	
}
