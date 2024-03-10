package com.camply.camp.search.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.camply.camp.search.dao.CampSearchDao;
import com.camply.camp.search.vo.CampSearchVO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CampSearchService {

	private final CampSearchDao campsearchdao;
	
	public ArrayList<CampSearchVO> campList(CampSearchVO campsearchvo) {

		return campsearchdao.searchCampList(campsearchvo);
	}

}
