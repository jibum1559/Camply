import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import '../../css/ShopDetail/ShopReview/ReviewWriter.css';
import Nav from '../../../camp/CampNavbar';
import {Button} from '@mui/material';
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


const ReviewPost = () => {
  const [reviewData, setReviewData] = useState({
    productId: 0, // 상품 ID
    reviewTitle: "", // 리뷰 제목
    reviewText: "", // 리뷰 내용
  });
  const location = useLocation(); // URL 정보 사용
  const navigate = useNavigate();
  const decodeBase64 = (str) => {
    // Base64 디코딩과 동시에 encodeURIComponent 함수를 사용하여 UTF-8 문자열을 올바르게 디코딩
    const decodedUri = decodeURIComponent(Array.prototype.map.call(window.atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(decodedUri);
  };
  useEffect(() => {
    // URL에서 productId 추출
    const query = new URLSearchParams(location.search);
    const productId = query.get("productId");
    if (productId) {
      setReviewData({ ...reviewData, productId });
    }
  }, [location]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };
  // 클릭시 뒤로 가기
  const handleback = () => {
    navigate(-1);
  }

  // 리뷰 작성 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("yourTokenKey");
    let userName, userId;
    if (token) {
      const decodedToken = decodeBase64(token.split(".")[1]);
      userName = decodedToken.USER_NAME; // 토큰에서 추출한 사용자 이름
      userId = decodedToken.user_id; // 토큰에서 추출한 사용자 ID
    }

    const postData = {
      ...reviewData,
      userId: userId, // 토큰에서 추출한 사용자 ID
      userName: userName, // 토큰에서 추출한 사용자 이름
    };

    try {
      await axios.post("http://localhost:8080/shop/review/post", postData);
      alert("리뷰가 작성되었습니다.");
      navigate(`/shop/detail/${reviewData.productId}`);
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  return (
    <>
    <Nav/>
    <form onSubmit={handleSubmit}>
    <h2 style={{textAlign:'center',marginTop:'60px'}}>리뷰작성</h2>
      {/* productId 필드는 hidden 유형으로 유지 */}
      <input type='hidden' name='productId' value={reviewData.productId} />
      <div className="writer-container">
        <div className="inquiry-title">
        
        제목  
        <br/>
      <input
        type='text'
        name='reviewTitle'
        placeholder='리뷰 제목'
        value={reviewData.reviewTitle}
        onChange={handleChange}
      />
      </div>
      <br/>

      <div className="inquiry-content">

        내용
        <br/>
      <textarea
        name='reviewText'
        placeholder='리뷰 내용'
        value={reviewData.reviewText}
        onChange={handleChange}
      />
      </div>
        <div className="writer-btn">
                  <button className="btn-writer" type="submit">작성하기 <FaCheck/></button>
                  <button className="back-btn" onClick={handleback}>
                  <IoIosArrowBack/> 목록보기
                  </button>
        </div> 
    </div>
    </form>
    </>
  );
};

export default ReviewPost;