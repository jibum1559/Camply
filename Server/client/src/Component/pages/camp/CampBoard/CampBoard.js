import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";
import "./css/CampBoard.css";
import CampNavbar from "../CampNavbar";

function BbsWrite() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [USER_BUSINESSADDRESS, setUserBusinessAddress] = useState("");
  const [USER_BUSINESSPHONE, setUserBusinessPhone] = useState("");
  const [newBoard, setNewBoard] = useState({
    user_id: "",
    camp_id: 0,
    camp_select: "",
    camp_location: "",
    camp_name: "",
    camp_address: "",
    camp_phone: "",
    camp_adult: 0,
    camp_child: 0,
    camp_price: 0,
    camp_images: [],
    camp_description: "",
    camp_facility: "",
  });

  const boardAdd = () => {
    const selectedFacilities = Object.entries(facilities)
      .filter(([facility, checked]) => checked)
      .map(([facility]) => facility)
      .join(", ");

    const campImagesString = newBoard.camp_images.join(";");

    if (
      newBoard.camp_select === "" ||
      newBoard.camp_location === "" ||
      newBoard.camp_name === "" ||
      newBoard.camp_adult === 0 ||
      newBoard.camp_price === 0 ||
      newBoard.camp_images.length === 0
    ) {
      alert("모든 필수 입력 항목을 채워주세요.");
      return;
    }

    axios
      .post("http://localhost:8080/camp/board/add", {
        ...newBoard,
        camp_facility: selectedFacilities,
        camp_images: campImagesString,
      })
      .then((response) => {
        console.log("성공", response.data);
        setNewBoard({
          user_id: "",
          camp_id: 0,
          camp_select: "",
          camp_location: "",
          camp_name: "",
          camp_address: "",
          camp_phone: "",
          camp_adult: 0,
          camp_child: 0,
          camp_price: 0,
          camp_images: [],
          camp_description: "",
          camp_facility: "",
        });
        setFacilities({
          수영장: false,
          족구장: false,
          와이파이: false,
          공용화장실: false,
          개인화장실: false,
          설거지장: false,
          샤워장: false,
          주차장: false,
          마트: false,
          바베큐장: false,
        });
        navigate("/camp/board/all");
      })
      .catch((error) => {
        console.error("실패", error);
      });
  };

  const [facilities, setFacilities] = useState({
    수영장: false,
    족구장: false,
    와이파이: false,
    공용화장실: false,
    개인화장실: false,
    설저지장: false,
    샤워장: false,
    주차장: false,
    마트: false,
    바베큐장: false,
  });

  const handleCheckboxChange = (facility) => {
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [facility]: !prevFacilities[facility],
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newBoard.camp_images];
    updatedImages[index] = value;
    setNewBoard({ ...newBoard, camp_images: updatedImages });
  };

  const addImageInputField = () => {
    if (newBoard.camp_images.length < 5) {
      setNewBoard({ ...newBoard, camp_images: [...newBoard.camp_images, ""] });
    } else {
      alert("이미지는 최대 5장까지 저장 가능합니다.");
    }
  };

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

    const decodeUTF8 = (input) => {
      try {
        return decodeURIComponent(escape(input));
      } catch (e) {
        return input;
      }
    };

    if (token) {
      try {
        const decodedToken = parseJwt(token);
        console.log("Decoded Token:", decodedToken);

        setUserId(decodedToken.user_id || "");
        setUserBusinessAddress(decodedToken.USER_BUSINESSADDRESS || "");
        setUserBusinessPhone(decodedToken.USER_BUSINESSPHONE || "");
        setNewBoard((prevNewBoard) => ({
          ...prevNewBoard,
          user_id: decodedToken.user_id || "",
          camp_address: decodedToken.USER_BUSINESSADDRESS || "",
          camp_phone: decodedToken.USER_BUSINESSPHONE || "",
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>

      <div>
        <table className="table">
          <tbody>
            <tr>
              <th className="table-primary">
                캠핑장 카테고리<span className="required"> *필수 입력</span>
              </th>
              <td className="radio-buttons-container">
                <div>
                  <input
                    type="radio"
                    id="tent"
                    name="campCategory"
                    value="tent"
                    checked={newBoard.camp_select === "텐트"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_select: "텐트" })
                    }
                  />
                  <label htmlFor="tent">텐트</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="glamping"
                    name="campCategory"
                    value="glamping"
                    checked={newBoard.camp_select === "글램핑"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_select: "글램핑" })
                    }
                  />
                  <label htmlFor="glamping">글램핑</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="caravan"
                    name="campCategory"
                    value="caravan"
                    checked={newBoard.camp_select === "카라반"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_select: "카라반" })
                    }
                  />
                  <label htmlFor="caravan">카라반</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="site"
                    name="campCategory"
                    value="site"
                    checked={newBoard.camp_select === "야영장"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_select: "야영장" })
                    }
                  />
                  <label htmlFor="site">사이트</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="pension"
                    name="campCategory"
                    value="pension"
                    checked={newBoard.camp_select === "펜션"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_select: "펜션" })
                    }
                  />
                  <label htmlFor="pension">펜션</label>
                </div>
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                캠핑장 위치 <span className="required"> *필수 입력</span>
              </th>
              <td className="radio-buttons-container">
                <div>
                  <input
                    type="radio"
                    id="seoul"
                    name="campLocation"
                    value="서울"
                    checked={newBoard.camp_location === "서울"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "서울" })
                    }
                  />
                  <label htmlFor="seoul">서울</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gyeonggi"
                    name="campLocation"
                    value="경기"
                    checked={newBoard.camp_location === "경기"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "경기" })
                    }
                  />
                  <label htmlFor="gyeonggi">경기</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="incheon"
                    name="campLocation"
                    value="인천"
                    checked={newBoard.camp_location === "인천"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "인천" })
                    }
                  />
                  <label htmlFor="incheon">인천</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gangwon"
                    name="campLocation"
                    value="강원"
                    checked={newBoard.camp_location === "강원"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "강원" })
                    }
                  />
                  <label htmlFor="gangwon">강원</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="chungcheong"
                    name="campLocation"
                    value="충청"
                    checked={newBoard.camp_location === "충청"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "충청" })
                    }
                  />
                  <label htmlFor="chungcheong">충청</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="jeolla"
                    name="campLocation"
                    value="전라"
                    checked={newBoard.camp_location === "전라"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "전라" })
                    }
                  />
                  <label htmlFor="jeolla">전라</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gyeongsang"
                    name="campLocation"
                    value="경상"
                    checked={newBoard.camp_location === "경상"}
                    onChange={() =>
                      setNewBoard({ ...newBoard, camp_location: "경상" })
                    }
                  />
                  <label htmlFor="gyeongsang">경상</label>
                </div>
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                캠핑장 주소 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={USER_BUSINESSADDRESS || ""}
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                캠핑장 이름 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={newBoard.camp_name}
                  onChange={(e) =>
                    setNewBoard({ ...newBoard, camp_name: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                캠핑장 전화번호 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={USER_BUSINESSPHONE || ""}
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                성인 인원 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={newBoard.camp_adult}
                  onChange={(e) =>
                    setNewBoard({
                      ...newBoard,
                      camp_adult:
                        e.target.value !== ""
                          ? parseInt(e.target.value, 10)
                          : 0,
                    })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                아동 인원 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={newBoard.camp_child}
                  onChange={(e) =>
                    setNewBoard({
                      ...newBoard,
                      camp_child:
                        e.target.value !== ""
                          ? parseInt(e.target.value, 10)
                          : 0,
                    })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                1박 가격 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={newBoard.camp_price}
                  onChange={(e) =>
                    setNewBoard({ ...newBoard, camp_price: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <th className="table-primary">
                캠핑장 사진 추가 <span className="required"> *필수 입력</span>
              </th>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={addImageInputField}
                >
                  사진 추가하기
                </button>
              </td>
            </tr>

            {newBoard.camp_images.map((image, index) => (
              <tr key={index}>
                <th className="table-primary">{`캠핑장 사진 ${index + 1}`}</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}

            <tr>
              <th className="table-primary">부대 시설</th>
              <td>
                <div className="facilities-checkbox-container">
                  {Object.entries(facilities).map(
                    ([facility, checked], index) => (
                      <div key={facility}>
                        <label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheckboxChange(facility)}
                          />
                          {facility}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </td>
            </tr>

            <tr>
              <th className="table-primary">캠핑장 상세설명</th>
              <td>
                <textarea
                  className="form-control"
                  value={newBoard.camp_description}
                  onChange={(e) =>
                    setNewBoard({
                      ...newBoard,
                      camp_description: e.target.value,
                    })
                  }
                  style={{ whiteSpace: 'pre-wrap' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-5 d-flex justify-content-center">
          <button className="btn btn-outline-secondary" onClick={boardAdd}>
            <i className="fas fa-pen"></i> 등록하기
          </button>
        </div>
      </div>
    </section>
  );
}

export default BbsWrite;
