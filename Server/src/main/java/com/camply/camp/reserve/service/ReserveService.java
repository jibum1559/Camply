package com.camply.camp.reserve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.camp.reserve.dao.ReserveDao;
import com.camply.camp.reserve.vo.ReserveVO;

@Service
public class ReserveService {

	@Autowired
	private ReserveDao reservedao;
	
	public void insertReserveCamp(ReserveVO reservevo) {
		reservedao.insertReserveCamp(reservevo);
	}
}
