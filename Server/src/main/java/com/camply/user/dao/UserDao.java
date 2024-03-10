package com.camply.user.dao;

import org.apache.ibatis.annotations.Mapper;
import com.camply.user.vo.UserVO;
import org.springframework.data.repository.query.Param;

@Mapper
public interface UserDao {

	void emailRegister(@Param("uservo") UserVO uservo);
	void kakaoRegister(@Param("uservo") UserVO uservo);
	void managerRegister(UserVO Uservo);
	UserVO selectEmail(String USER_EMAIL);
	UserVO getKakao(String USER_EMAIL);
	void deleteUserById(Long USER_ID);
	UserVO selectUserById(Long USER_ID);
	void updateUserById(UserVO Uservo);
}