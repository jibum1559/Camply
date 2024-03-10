package com.camply.camp.dips.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.camp.dips.vo.DipsVO;

@Mapper
public interface DipsDAO {
	
    void insertCampDips(DipsVO dipsvo);
    void deleteCampDips(DipsVO dipsvo);
    
    DipsVO selectCampDips(DipsVO dipsvo);
}