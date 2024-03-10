package com.camply.camp.dips.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camply.camp.dips.dao.DipsDAO;
import com.camply.camp.dips.vo.DipsVO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class DipsService {

    @Autowired
    private DipsDAO dipsDAO;
    
    public void addCampDips(DipsVO dipsvo) {
        dipsDAO.insertCampDips(dipsvo);
    }

    public void removeCampDips(DipsVO dipsvo) {
        dipsDAO.deleteCampDips(dipsvo);
    }
    
    // 찜하기 찾기
    public DipsVO selectCampDips(DipsVO dipsvo) {
    	return dipsDAO.selectCampDips(dipsvo);
    }
}
