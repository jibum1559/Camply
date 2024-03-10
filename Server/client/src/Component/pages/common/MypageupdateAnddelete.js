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

        <div id="MypageContainer">
          <div id="mypagebuttonbox">
            <div>
              <p id="MypagecampinfoTitle">쇼핑정보</p>
              <button
                id="Mypageinfo"
                variant="primary"
                onClick={() => navigate("/myshopping")}
              >
                {" "}
                쇼핑정보
              </button>
            </div>
            <div>
              <p id="MypagecampinfoTitle">캠핑정보</p>
              <button
                id="Mypageinfo"
                variant="primary"
                onClick={() => navigate("/mycamping")}
              >
                캠핑예약내역
              </button>
              <button
                id="Mypageinfo"
                variant="primary"
                onClick={() => navigate("/MyLikeList")}
              >
                캠핑 찜 목록
              </button>
            </div>
          </div>
          <div>
            <div>
              <h4 id="MypageTitle">내정보 수정</h4>
              <p id="updateUserinfo">이메일: {userData.USER_EMAIL}</p>
              <p id="updateUserinfo">이름: {userData.USER_NAME}</p>
              <p id="updateUserinfo">닉네임: {userData.USER_NICKNAME}</p>

              {userData.USER_TYPE === "General" && (
                <p>주소: {userData.USER_ADDRESS}</p>
              )}

              {userData.USER_TYPE === "Admin" && (
                <>
                  <p>사업자 번호: {userData.USER_BUSINESSNUMBER}</p>
                  <p>사업자 주소: {userData.USER_BUSINESSADDRESS}</p>
                  <p>사업자 전화번호: {userData.USER_BUSINESSPHONE}</p>
                </>
              )}

              <Button id="userupdateButton" onClick={handleShowModal}>
                수정하기
              </Button>

              <Button
                id="userdeleteButton"
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? "회원 탈퇴 중..." : "회원 탈퇴"}
              </Button>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>비밀번호 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="formPasswordModal">
                    <Form.Label>비밀번호를 입력하세요</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    취소
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
