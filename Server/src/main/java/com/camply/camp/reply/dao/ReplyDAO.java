package com.camply.camp.reply.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.camply.camp.reply.vo.ReplyVO;
@Mapper
public interface ReplyDAO {
    List<ReplyVO> selectRepliesByCampId(@Param("camp_id") Long campId);
    void insertReply(ReplyVO reply);
    void updateReply(ReplyVO reply);
    void deleteReply(@Param("camp_reviewnumber") Long reviewNumber);
}
