import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import StarRating from "./StarRating";
import StarRated from "./StarRated";
import { Row } from "react-bootstrap";
import "../css/review.css";

function ReplyComponent() {
  const [replyData, setReplyData] = useState([]);
  const [userId, setUserId] = useState("");
  const [newReply, setNewReply] = useState({
    user_id: "",
    camp_rating: 5,
    camp_review: "",
  });
  const { camp_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/reply/${camp_id}`)
      .then((response) => {
        setReplyData(response.data);
      })
      .catch((error) => {
        console.error("리뷰 목록 가져오기 실패:", error);
      });
  }, [camp_id]);

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");

    const parseJwt = (token) => {
      try {
        return JSON.parse(
          decodeURIComponent(escape(atob(token.split(".")[1])))
        );
      } catch (e) {
        return null;
      }
    };

    if (token) {
      try {
        const decodedToken = parseJwt(token);
        setUserId(decodedToken.user_id || "");
        setNewReply((prevNewReply) => ({
          ...prevNewReply,
          user_id: decodedToken.user_id || "",
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleAddReply = () => {
    axios
      .post(`http://localhost:8080/board/reply/add/${camp_id}`, newReply)
      .then(() => {
        setNewReply({
          user_id: userId,
          camp_rating: 5,
          camp_review: "",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("리뷰 추가 실패:", error);
      });
  };

  const handleDeleteReply = (replyId) => {
    axios
      .delete(`http://localhost:8080/board/reply/delete/${replyId}`)
      .then(() => {
        setReplyData((prevReplies) =>
          prevReplies.filter((reply) => reply.camp_reviewnumber !== replyId)
        );
        console.log("Reply deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete reply:", error);
      });
  };

  const handleRatingChange = (rating) => {
    setNewReply({ ...newReply, camp_rating: rating });
  };

  return (
    <div id="reviewContainer">
      <div id="reviewcontentBox">
        <h5 id="reviewListTitle">방문후기</h5>
        <div id="reviewBox">
          <span id="reviewType">User:</span>
          <input
            id="reviewUserID"
            className="form-control"
            type="text"
            value={userId || ""}
            readOnly
          />
          <label id="reviewType">평점:</label>
          <StarRating onChange={handleRatingChange} />
          <label id="reviewType">리뷰:</label>
          <input
            className="form-control"
            id="reviewContent"
            type="text"
            value={newReply.camp_review}
            placeholder="리뷰내용을 입력해주세요"
            onChange={(e) =>
              setNewReply({ ...newReply, camp_review: e.target.value })
            }
          />
          <button id="reviewButton" onClick={handleAddReply}>
            리뷰 추가
          </button>
        </div>
        {replyData.map((reply) => (
          <div key={reply.camp_reviewnumber}>
            <div>
              <Row md={6}>
                <span id="reviewcontentuserid">유저 ID: {reply.user_id}</span>
                <span id="reviewcontentrating">
                  <StarRated value={reply.camp_rating} />
                </span>
              </Row>
            </div>
            <p id="reviewcontent" style={{marginTop:'30px'}}>{reply.camp_review}</p>
            <div id="reviewcontentupdatedelete">
              <div id="reviewcontentupdatedelete">
                <p>
                  {reply.user_id === userId && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteReply(reply.camp_reviewnumber)}
                    >
                      삭제
                    </Button>
                  )}
                </p>
              </div>
            </div>
            <hr id="reviewhrBar" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReplyComponent;
