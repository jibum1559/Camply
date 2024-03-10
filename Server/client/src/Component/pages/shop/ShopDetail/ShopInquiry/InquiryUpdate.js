import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Nav from '../../../camp/CampNavbar';
import { Button } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
const InquiryUpdate = () => {
  const navigate = useNavigate();
  const { questionNo } = useParams();
  const [question, setQuestion] = useState({
    questionTitle: "",
    questionText: "",
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };
  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/shop/question/${questionNo}` // 수정: 문의글 단건 조회 경로로 변경
      );
      setQuestion(response.data);
    } catch (error) {
      console.error("문의글 정보를 불러오는 중 오류 발생", error);
    }
  };
  const updateQuestion = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/shop/question/update/${questionNo}`,
        {
          questionTitle: question.questionTitle,
          questionText: question.questionText,
        }
      );
      alert("수정 완료!");
      navigate(`/shop/question/view/${questionNo}`);
    } catch (error) {
      console.error("문의글 수정 중 오류 발생", error);
    }
  };
  const backToList = () => {
    navigate(`/shop/question/view/${questionNo}`);
  };
  useEffect(() => {
    getQuestion();
  }, [questionNo]);
  return (
    <>
    <Nav/>
    <div>
    <h2 style={{textAlign:'center',marginTop:'60px'}}> 문의 수정</h2>
      <form onSubmit={updateQuestion}>
      <div className="writer-container">
        <div className="inquiry-title">
          제목
          <br/>
          <input
            type='text'
            name='questionTitle'
            value={question.questionTitle}
            onChange={onChange}
          />
        </div>
        <br />
        <div className="inquiry-content">
          내용
          <br/>
          <textarea
            name='questionText'
            value={question.questionText}
            onChange={onChange}
          />
        </div>
        <br />
        <div className="writer-btn">
          <button className="btn-writer" type="submit">수정 <FaCheck/></button>
          <button className="back-btn"  onClick={backToList}>
          <IoIosArrowBack/> 취소
          </button>
        </div>
        </div>
      </form>
    </div>
    </>
  );
};
export default InquiryUpdate;