import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap";
import CampNavbar from "../camp/CampNavbar";
import bcrypt from "bcryptjs";
import "../camp/CampBoard/css/MyPage.css";

function MyPage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴하시겠습니까?");

    if (confirmDelete) {
      const token = localStorage.getItem("yourTokenKey");

      setDeleting(true);

      const USER_ID = parseUserIdFromToken(token);

      axios
        .delete(`http://localhost:8080/api/user/delete/${USER_ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          localStorage.removeItem("yourTokenKey");
          setUserData({});
          navigate("/login");
        })
        .catch((error) => {
          console.error("회원 탈퇴 실패:", error);
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleEdit = async () => {
    handleCloseModal();
    try {
      const token = localStorage.getItem("yourTokenKey");
      const USER_ID = parseUserIdFromToken(token);

      const response = await axios.get(
        `http://localhost:8080/api/user/get/${USER_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const storedPassword = response.data.USER_PASSWORD;
      console.log("Entered Password:", password);
      console.log("Stored Password:", storedPassword);

      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (passwordMatch) {
        setPasswordVerified(true);
        navigate("/mypage/edit");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("Error during password verification:", error);
    }
  };

  useEffect(() => {
    if (passwordVerified) {
      navigate("/mypage/edit");
    }
  }, [passwordVerified, navigate]);

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
        <a href="MyPage2">내 정보 수정</a>
        <div id="MypageContainer">
          <div id="mypagebuttonbox">
            <div>
              <p id="MypagecampinfoTitle">캠핑정보</p>
              <button
                id="Mypagecampinfo"
                variant="primary"
                onClick={() => navigate("/mycamping")}
              >
                <span style={{ color: "orange" }}>▶</span> 캠핑예약내역
              </button>
            </div>
            <div>
              <button
                id="Mypageinfo"
                variant="primary"
                onClick={() => navigate("/MyLikeList")}
              >   캠핑 찜 목록
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
