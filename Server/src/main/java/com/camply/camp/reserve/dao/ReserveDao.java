package com.camply.camp.reserve.dao;

import org.apache.ibatis.annotations.Mapper;

import com.camply.camp.reserve.vo.ReserveVO;

@Mapper
public interface ReserveDao {

	void insertReserveCamp(ReserveVO reservevo);
	
}
