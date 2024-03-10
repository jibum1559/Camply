import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useParams 제거
import '../../../css/ShopDetail/ShopInquiry/InquiryComment.css';

const CommentWriter = ({ questionNo, updateComments }) => {
  // props로 questionNo 받음
  const navigate = useNavigate();
  // const { questionNo } = useParams(); // useParams 사용 제거
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
        `http://localhost:8080/shop/question/comment/post`,
        {
          ...comment,
          questionNo: questionNo, // 숫자형 questionNo 사용
        }
      );
      if (response.status === 200) {
        alert("덧글 등록 완료");
        setComment({ commentText: "" }); 
        await updateComments(); 
        navigate(`/shop/question/view/${questionNo}`);
    
      } else {
        alert("덧글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("덧글 등록 중 오류 발생", error);
      alert("덧글 등록에 실패했습니다.");
    }
  };

  const backToList = () => {
    navigate(`/shop/question/view/${questionNo}`);
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