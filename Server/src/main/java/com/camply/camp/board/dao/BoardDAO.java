package com.camply.camp.board.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.camply.camp.board.vo.BoardVO;

@Mapper
@Repository
public interface BoardDAO {

	void insertBoard(BoardVO board);
	List<BoardVO> getAllBoard();
	List<BoardVO> getBoardCategory(String camp_select);
	List<BoardVO> getBoardLocation(String camp_location);
	BoardVO getBoardById(Long campId);
	void deleteBoardById(Long campId);
	void updateBoardById(BoardVO board);

}
