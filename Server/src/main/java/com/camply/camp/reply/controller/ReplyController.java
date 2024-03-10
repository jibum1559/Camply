package com.camply.camp.reply.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.camp.reply.service.ReplyService;
import com.camply.camp.reply.vo.ReplyVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board/reply")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class ReplyController {

    private final ReplyService replyService;

    @GetMapping("/{camp_id}")
    public List<ReplyVO> getRepliesByCampId(@PathVariable Long camp_id) {
        return replyService.getRepliesByCampId(camp_id);
    }

    @PutMapping("/update")
    public void updateReply(@RequestBody ReplyVO reply) {
        replyService.updateReply(reply);
    }

    @DeleteMapping("/delete/{reviewNumber}")
    public void deleteReply(@PathVariable Long reviewNumber) {
        replyService.deleteReply(reviewNumber);
    }

    @PostMapping("/add/{camp_id}")
    public void addReply(@PathVariable Long camp_id, @RequestBody ReplyVO reply) {
        // Set the camp_id before adding the reply
        reply.setCamp_id(camp_id);

        replyService.addReply(reply);
    }
}

