import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../../css/ShopDetail/ShopReview/ReviewComment.css';
import { Button, radioClasses } from "@mui/material";

const CommentWriter = ({ reviewNo, updateComments }) => {
  // props로 reviewNo 받음
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    commentText: "",
  });
  const { commentText } = comment;

  const onChange = (event) => {
    const { value, name } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };
  const saveComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/shop/review/comment/post`,
        {
          ...comment,
          reviewNo: reviewNo,
        }
      );
      if (response.status === 200) {
        alert("덧글 등록 완료");
        setComment({ commentText: "" }); 
        await updateComments(); 
        navigate(`/shop/review/view/${reviewNo}`); // 상태 업데이트 후 페이지 이동
      } else {
        alert("덧글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("덧글 등록 중 오류 발생", error);
      alert("덧글 등록에 실패했습니다.");
    }
  };

  const backToList = () => {
    navigate(`/shop/review/view/${reviewNo}`);
  };

  return (
    <>
    <div className="comment-container">
      <div className="comment-writer" style={{marginTop:'0px'}}>
        <label for="editor" className="comment-writer_tl fl">
          <strong style={{paddingLeft:'5px'}}>댓글쓰기</strong>
        </label>
        <div className="bd_writer clear">
          <div className="simple-writer">
            <div className="text-btn">
                <input
                  type='text'
                  name='commentText'
                  value={commentText}
                  onChange={onChange}
                />
              <button style={{marginLeft:'10px', borderRadius:'10px', width:'80px', height:'90px'}} type='button'  onClick={saveComment}>작성하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CommentWriter;