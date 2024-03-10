package com.camply.camp.mypage.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.camply.camp.mypage.vo.CampDipsListVO;
import com.camply.camp.mypage.vo.CampPaymentResultVO;
import com.camply.camp.mypage.vo.CampUploadProductListVO;

@Mapper
public interface CampMypageDao {

	// 결제완료 리스트 DAO
	ArrayList<CampPaymentResultVO> pamentResultList(CampPaymentResultVO resultVO);
	
	// 업록드 리스트 DAO
	ArrayList<CampUploadProductListVO> uploadProductList(CampUploadProductListVO productListVO);
	
	// 좋아요 누른 캠핑장리스트 DAO
	ArrayList<CampDipsListVO> dipsList(CampDipsListVO dipsListVO);
	
}
