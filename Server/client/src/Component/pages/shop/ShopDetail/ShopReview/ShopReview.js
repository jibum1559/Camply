// ShopInquiry.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom"; // useParams 추가
import '../../css/ShopDetail/ShopReview/ShopReview.css';
import {Button} from '@mui/material';





const ShopReview = () => {
    // 컴포넌트 이름 변경: ShopInquiry -> ShopReview
    const [reviews, setReviews] = useState([]); // 변수명 변경: questions -> reviews
    const navigate = useNavigate();
    const { productId } = useParams(); // URL 파라미터에서 productId 추출
   




  
    useEffect(() => {
      const fetchReviews = async () => {
        // 함수명 변경: fetchQuestions -> fetchReviews
        try {
          // productId를 사용하여 해당 제품의 리뷰만 가져오는 엔드포인트로 수정
          const response = await axios.get(
            `http://localhost:8080/shop/review/view/${productId}` // 경로 변경: question -> review
          );
          setReviews(response.data); // 상태 변경 함수명 수정: setQuestions -> setReviews
            
        } catch (error) {
          console.error("리뷰 불러오는 중 에러 발생!!", error);
        }
      };
  
      if (productId) {
        fetchReviews();
      } else {
        console.error("productId가 정의되지 않았습니다.");
      }
    }, [productId]);

  
    // 리뷰 클릭 시 상세 정보 페이지로 이동하는 함수
    const handleReviewClick = (reviewNo) => {
      // 함수명 변경: handleQuestionClick -> handleReviewClick
      navigate(`/shop/review/view/${reviewNo}`); // 경로 변경: question -> review
    };
  
    // 작성하기 버튼 클릭 시 이동하는 함수
    const handleWriteClick = () => {
      // 리뷰 작성 경로에 productId를 포함하여 수정
      navigate(`/review/writer?productId=${productId}`); // 경로 변경: inquiry -> review
    };
    

  return (
    <>
     <h2 style={{textAlign:'center', marginTop:'50px', marginBlock:'50px'}}>상품리뷰</h2>
     <a name="reviewboard"></a>
     <div className="tit-detail">
        <p className="more fe"></p>
     </div>
     <div className="table-slide review-list smaller-table">
        <table summary="번호, 제목, 작성자, 작성일, 조회">
            <colgroup>
                <col width={5}></col>
                <col width={5}></col>
                <col width={15}></col>
                <col width={15}></col>
                <col width={10}></col>
                <col width={5}></col>
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">
                        <div className="tb-center">NO</div>
                    </th>
                    <th scope="col"></th>
                    <th scope="col">
                        <div className="tb-center">제목</div>
                    </th>
                    <th scope="col">
                        <div className="tb-center">작성자</div>
                    </th>
                    <th scope="col">
                        <div className="tb-center">작성일</div>
                    </th>
                    <th scope="col">
                        <div className="tb-center">조회수</div>
                    </th>
                </tr>
            </thead>
            {reviews.map((review) => (
            <tbody key={review.reviewNo}>
                <tr className="nbg">
                    <td>
                       <div className="tb-center">
                         <span className="reviewnum">
                          {review.reviewNo}
                         </span>
                       </div> 
                    </td>
                    <td>
                        <div className="tb-center"></div>
                    </td>
                    <td>
                        <div style={{cursor:'pointer'}}
                          onClick={() => handleReviewClick(review.reviewNo)}
                        className="tb-left reply_depth0">
                          <span>{review.reviewTitle}</span>
                        </div>
                    </td>
                    <td>
                        <div className="tb-center writer">
                            <span>
                             {review.userName}
                            </span>
                        </div>
                    </td>
                    <td>
                      <div className="tb-center">{review.reviewDate.split('T')[0]}</div>
                    </td>
                    <td>
                      <div className="tb-center">
                        <span className="review_board_showhits1">{review.reviewHit}</span>
                      </div>
                    </td>
                </tr>
                <tr className="ms_review_content_box cnt" style={{display:'none'}}>
                  <td colSpan={6}>
                    <div className="tb-left">
                      <div className="review-board-content">
                        <div style={{paddingBottom:'15px',paddingLeft:'80px',paddingRight:'15px',paddingTop:'15px'}}></div>
                        <div className="ms_cmt_list_box"></div>
                      </div>
                    </div>
                  </td>
                </tr>
            </tbody>
             ))}
        </table>
        <div className="btm-writer">
            <button type='button' className="btn-writer" onClick={handleWriteClick}>글쓰기</button>
        </div>
        
        
     </div>
        
    
    </>
    
  )
};

export default ShopReview;
