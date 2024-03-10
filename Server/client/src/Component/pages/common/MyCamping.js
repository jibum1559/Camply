import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap";
import CampNavbar from "../camp/CampNavbar";
import bcrypt from "bcryptjs";
import "../camp/CampBoard/css/MyPage.css";
import { format } from 'date-fns';
import { fontSize, margin, padding } from "@mui/system";

function MyPage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [campList, setCampList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");

    if (token) {
      const USER_ID = parseUserIdFromToken(token);

      axios
        .get(`http://localhost:8080/api/user/get/${USER_ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User Data Response:", response.data);
          setUserData(response.data || {});

          setLoading(false);

          axios.post(`http://localhost:8080/camp/Mypage/paymentResult`, {
            USER_ID: USER_ID,
          })
          .then((responseData) => {
           setCampList(responseData.data);
          })
          .catch ((error) => {
            console.log("항목조회실패" + error.response.data.message);
          });

          console.log("campList length : " + campList);
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const parseUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload.user_id;
    } catch (error) {
      console.error("parseUserIdFromToken", error);
      return null;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>

      <div className="body-mypage">
        <h1 className="mb-4" id="mypageMainTitle">
          마이페이지
        </h1>
        <p>안녕하세요.</p>
        <p>{userData.USER_NAME}님 </p>
        <a href="mypageupdate">내 정보 수정</a>
        <div id="MypageContainer">
          <div id="mypagebuttonbox">
            <div>
              <p id="MypagecampinfoTitle">캠핑정보</p>
                <div>
                  <button
                    id="Mypagecampinfo"
                    variant="primary"
                    onClick={() => navigate("/mycamping")}
                  >
                    <span style={{ color: "orange" }}>▶</span>캠핑예약내역
                  </button>
                  <button
                    id="Mypageinfo"
                    variant="primary"
                    onClick={() => navigate("/mylikelist")}
                  >
                    캠핑 찜 목록
                  </button>
                </div>
            </div>
          </div>
          <div>
            <h5 id="reserveListTitle">캠핑 예약 내역</h5>

              { campList.length > 0 ?
                <div>
                  {campList.map((camp) => (
                  <div key={camp.CAMP_RESERVATION} id="mypagereserveList" >
                    <p>{camp.CAMP_NAME}</p>
                    <div></div>
                    <div id="reservesecondBox">
                      <span> 체크인 : {format(camp.CAMP_CHECKIN, 'yyyy-MM-dd')}</span><br/>
                      <span> 체크아웃 : {format(camp.CAMP_CHECKOUT, 'yyyy-MM-dd')}</span><br/>
                      <p>결제 완료 시각 : {format(camp.COMPLETE_PAYMENT, 'yyyy-MM-dd HH:mm')}</p>
                      <span id="reserveResult">
                        결제금액 : {camp.TOTAL_PRICE}원
                      </span>
                    </div>
                  </div>
                ))}
                </div>
                :
                <div>
                
                    <p style={{margin:'200px' , fontSize:'20px'}}>예약한 캠핑장 내역이 없습니다.</p>
                
                </div>
              } 

          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
