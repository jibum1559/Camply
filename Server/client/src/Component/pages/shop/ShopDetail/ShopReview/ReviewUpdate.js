import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../../css/ShopDetail/ShopReview/ShopReview.css';
import Nav from '../../../camp/CampNavbar';
import { Button } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const ReviewUpdate = () => {
  const navigate = useNavigate();
  const { reviewNo } = useParams();
  const [review, setReview] = useState({
    reviewTitle: "",
    reviewText: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const getReview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/shop/review/${reviewNo}` // 수정: 리뷰 단건 조회 경로로 변경
      );
      setReview(response.data);
    } catch (error) {
      console.error("리뷰 정보를 불러오는 중 오류 발생", error);
    }
  };

  const updateReview = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/shop/review/update/${reviewNo}`,
        {
          reviewTitle: review.reviewTitle,
          reviewText: review.reviewText,
        }
      );
      alert("수정 완료!");
      navigate(`/shop/review/view/${reviewNo}`);
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생", error);
    }
  };

  const backToList = () => {
    navigate(`/shop/review/view/${reviewNo}`);
  };

  useEffect(() => {
    getReview();
  }, [reviewNo]);

  return (
    <>
    <Nav/>
    <div>
      <h2 style={{textAlign:'center',marginTop:'60px'}}>리뷰 수정</h2>
      <form onSubmit={updateReview}>
      <div className="writer-container">
        <div className="inquiry-title">
          제목
          <br/>
          <input
            className=""
            type='text'
            name='reviewTitle'
            value={review.reviewTitle}
            onChange={onChange}
          />
        </div>
        <br />
        <div className="inquiry-content">
          내용
          <br/>
          <textarea
            name='reviewText'
            value={review.reviewText}
            onChange={onChange}
          />
        </div>
        <br />
        <div className="writer-btn">
          <button className="btn-writer" type="submit">수정 <FaCheck/></button>
          <button className="back-btn" onClick={backToList}>
          <IoIosArrowBack/> 취소
          </button>
        </div>
      </div>
      </form>
    </div>
    </>
  );
};

export default ReviewUpdate;