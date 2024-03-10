import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import CampNavbar from "../camp/CampNavbar";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    USER_NAME: "",
    USER_EMAIL: "",
    USER_NICKNAME: "",
    USER_ADDRESS: "",
    USER_BUSINESSNUMBER: "",
    USER_BUSINESSADDRESS: "",
    USER_BUSINESSPHONE: "",
  });
  const [showAlert, setShowAlert] = useState(false);
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
          setFormValues({
            USER_NAME: response.data.USER_NAME || "",
            USER_EMAIL: response.data.USER_EMAIL || "",
            USER_NICKNAME: response.data.USER_NICKNAME || "",
            USER_ADDRESS: response.data.USER_ADDRESS || "",
            USER_BUSINESSNUMBER: response.data.USER_BUSINESSNUMBER || "",
            USER_BUSINESSADDRESS: response.data.USER_BUSINESSADDRESS || "",
            USER_BUSINESSPHONE: response.data.USER_BUSINESSPHONE || "",
          });
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
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("yourTokenKey");
    const USER_ID = parseUserIdFromToken(token);

    axios
      .put(`http://localhost:8080/api/user/update/${USER_ID}`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User Data Updated:", response.data);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/mypage");
        }, 3000);
      })
      .catch((error) => {
        console.error("사용자 정보 업데이트 실패:", error);
      });
  };

  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        setMap(new window.kakao.maps.Map(container, options));
        setMarker(new window.kakao.maps.Marker());
      });
    };

    return () => {
      window.onload = null;
    };
  }, []);

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (addrData) {
        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(addrData.address, function (result, status) {
          setFormValues({
            ...formValues,
            USER_ADDRESS: addrData.address,
          });
        });
      },
    }).open();
  };

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>

      <Alert show={showAlert} variant="success">
        회원정보 수정이 완료되었습니다.
      </Alert>

      <h1>회원정보 수정</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력해주세요"
                name="USER_EMAIL"
                value={formValues.USER_EMAIL}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름을 입력해주세요"
                name="USER_NAME"
                value={formValues.USER_NAME}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임을 입력해주세요"
                name="USER_NICKNAME"
                value={formValues.USER_NICKNAME}
                onChange={handleInputChange}
              />
            </Form.Group>

            {userData.USER_TYPE === "General" && (
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>주소</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="주소를 입력해주세요"
                  name="USER_ADDRESS"
                  value={formValues.USER_ADDRESS}
                  onClick={onClickAddr}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            {userData.USER_TYPE === "Admin" && (
              <>
                <Form.Group className="mb-3" controlId="formBusinessNumber">
                  <Form.Label>사업자 번호</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="사업자 번호를 입력해주세요"
                    name="USER_BUSINESSNUMBER"
                    value={formValues.USER_BUSINESSNUMBER}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBusinessAddress">
                  <Form.Label>사업자 주소</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="사업자 주소를 입력해주세요"
                    name="USER_BUSINESSADDRESS"
                    value={formValues.USER_BUSINESSADDRESS}
                    onClick={onClickAddr}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBusinessPhone">
                  <Form.Label>사업자 전화번호</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="사업자 전화번호를 입력해주세요"
                    name="USER_BUSINESSPHONE"
                    value={formValues.USER_BUSINESSPHONE}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit">
              저장
            </Button>
          </Form>
        </>
      )}
    </section>
  );
}

export default EditUser;
