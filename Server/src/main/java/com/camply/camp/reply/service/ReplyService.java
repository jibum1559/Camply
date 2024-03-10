package com.camply.camp.reply.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.camply.camp.reply.dao.ReplyDAO;
import com.camply.camp.reply.vo.ReplyVO;

@Service
public class ReplyService {

    private final ReplyDAO replyDAO;

    public ReplyService(ReplyDAO replyDAO) {
        this.replyDAO = replyDAO;
    }

    public List<ReplyVO> getRepliesByCampId(Long campId) {
        return replyDAO.selectRepliesByCampId(campId);
    }
    public void addReply(ReplyVO reply) {
        replyDAO.insertReply(reply);
    }

    public void updateReply(ReplyVO reply) {
        replyDAO.updateReply(reply);
    }

    public void deleteReply(Long reviewNumber) {
        replyDAO.deleteReply(reviewNumber);
    }

}

