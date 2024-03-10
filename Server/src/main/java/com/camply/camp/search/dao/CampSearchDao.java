package com.camply.camp.search.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.camply.camp.search.vo.CampSearchVO;

@Mapper
public interface CampSearchDao {

	ArrayList<CampSearchVO> searchCampList(CampSearchVO campsearchvo);
}
