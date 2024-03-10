package com.camply.shop.productdetail.question.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camply.shop.productdetail.question.dao.QuestionDao;
import com.camply.shop.productdetail.question.vo.QuestionVO;

@Service
public class QuestionService {
	@Autowired
	private QuestionDao questionDao;

	// 문의 전체 조회
	public List<QuestionVO> getAllQuestions() {
		return questionDao.selectAllQuestions();
	}

	// 문의 조회
	public List<QuestionVO> getQuestion(int productId) {
		return questionDao.getQuestion(productId);
	}
	// 업데이트용 문의 조회
	public QuestionVO getQuestionNo(int questionNo) {
		return questionDao.selectUpdateQuestions(questionNo);
	}
	// 문의 작성
	public void postQuestion(QuestionVO questionVO) {
		questionDao.insertQuestion(questionVO);
	}

	// 문의 조회수 증가
	@Transactional
	public void incrementQuestionHit(int questionNo) {
		questionDao.incrementQuestionHit(questionNo);
	}

	// 문의 수정
	@Transactional
	public void questionUpdate(QuestionVO questionVO) {
		questionDao.updateQuestion(questionVO);
	}

	// 문의 삭제
	public void questionDelete(int questionNo) {
		questionDao.deleteQuestion(questionNo);
	}

}
