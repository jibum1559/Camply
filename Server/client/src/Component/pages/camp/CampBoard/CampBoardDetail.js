import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Reply from "./Board/Reply";
import CampNavbar from "../CampNavbar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../CampBoard/css/CampDetail.css";
import tentIMG from "../../../img/텐트.png";
import marker from "../../../img/마커.png";
import copyIMG from "../../../img/공유.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";


const parseJwt = (token) => {
  console.log("Parsed JWT:", token);
};

function CampBoardDetail() {
  const location = useLocation();
  const [boardData, setBoardData] = useState({ camp_images: [] });
  const { camp_id } = useParams();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(
    localStorage.getItem("yourTokenKey")
  );
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [USER_ID , setUserID] = useState();
  const [like, setLike] = useState("");

  const handleHeart = () => {
    setLike(!like);
    axios
      .post(`http://localhost:8080/camp/board/changDips`, {
        CAMP_ID: camp_id,
        USER_ID: USER_ID,
        STATUS: like,
      })
      .then((response) => {
        if (response.data === "addlike") {
          alert("찜하기 등록 완료");
        } else {
          alert("찜하기 등록 해제");
        }
      })
      .catch((error) => {
        alert("찜하기 실행 실패: " + error.response.data.message);
      });
  };

  const initializeMap = useCallback(() => {
    if (window.kakao && boardData.camp_address) {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 지도를 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        geocoder.addressSearch(
          boardData.camp_address,
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${boardData.camp_name}</div>`,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardData.camp_address]);

  useEffect(() => {
    if (!camp_id) {
      navigate("/camp/board/all");
      alert("없는 페이지입니다.");
      return;
    }

    const userToken = localStorage.getItem("yourTokenKey");
    setUserToken(userToken);

    if (!userToken) {
      setIsCurrentUser(null);
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/camp/board/get/${camp_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const camp_images = response.data.camp_images.split(";");
        setBoardData({ ...response.data, camp_images });

        try {
          const base64Url = userToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const userTokenPayload = JSON.parse(atob(base64));

          console.log("User ID from token:", userTokenPayload?.user_id);
          console.log("User ID from response:", response.data.user_id);

          const currentUser =
            response.data.user_id === userTokenPayload?.user_id;

            setUserID(userTokenPayload?.user_id);
          console.log("Is current user:", currentUser);
          setIsCurrentUser(currentUser ? userTokenPayload?.user_id : null);

          setLoading(false);
          axios
            .post(`http://localhost:8080/camp/board/checkDips`, {
              CAMP_ID: camp_id,
              USER_ID: userTokenPayload?.user_id,
            })
            .then((response) => {
              if (response.data === true) {
                setLike(!like);
              } else {
                setLike(like);
              }
            })
            .catch((error) => {
              console.log("찜하기 조회 실패" + error.response.data.message);
            });
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      })
      .catch((error) => {
        console.error("게시글 가져오기 실패:", error);
      });
  }, [camp_id, navigate]);

  useEffect(() => {
    setUserToken(localStorage.getItem("yourTokenKey"));
  }, [camp_id]);

  const handleUpdateClick = () => {
    navigate(`/camp/board/edit/${camp_id}`);
  };

  useEffect(() => {
    initializeMap();
  }, [initializeMap, boardData.camp_address]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "게시글이 삭제됩니다. 계속하시겠습니까?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/camp/board/delete/${camp_id}`)
        .then(() => {
          alert("삭제되었습니다.");
          navigate("/camp/board/all");
        })
        .catch((error) => {
          alert("게시글 삭제 실패: " + error.response.data.message);
        });
    } else {
      alert("취소 되었습니다.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  // 검색페이지에서 검색 조건 받기
  const searchInfo = { ...location.state };

  // 예약페이지 이동
  const reserveMove = ({}) => {

    navigate("/camp/reserve", {
      state: {
        // 캠핑장 번호
        CAMP_ID: `${boardData.camp_id}`,
        // 캠핑유형
        CAMP_SELECT: `${searchInfo.CAMP_SELECT}`,
        // 선택인원 (성인)
        CAMP_ADULT: `${searchInfo.CAMP_ADULT}`,
        // 선택인원 (아이)
        CAMP_CHILD: `${searchInfo.CAMP_CHILD}`,
        // 체크인 시간
        CAMP_CHECKIN: `${searchInfo.CAMP_CHECKIN}`,
        // 체크아웃 시간
        CAMP_CHECKOUT: `${searchInfo.CAMP_CHECKOUT}`,
        // 캠핑장이름
        CAMP_NAME: `${boardData.camp_name}`,
        // 가격
        CAMP_PRICE: `${boardData.camp_price}`
      },
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === boardData.camp_images.length - 1 ? 0 : prevPage + 1
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? boardData.camp_images.length - 1 : prevPage - 1
    );
  };

  // 링크 외부에 공유하기
    const handleCopy = () => {
      const dataToCopy = window.location.href;
      navigator.clipboard.writeText(dataToCopy)
        .then(() => {
          alert('링크가 클립보드에 복사되었습니다!');
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
        });
    };

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

  return (
    <section>
      <CampNavbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content"></Container>
      </Container>
      <div id="detailContainer">
        <h1 id="campdetailTitle">상세보기</h1>

        <div id="campDetailBox">
            <p id="detailType">유형 | {boardData.camp_select}</p>
            <img src={tentIMG} alt="텐트" id="DetailIMG"></img>
            <span id="campdetailName"> 캠핑장 이름 | {boardData.camp_name}</span>
            <div>
            <p id="campdetaillocation">
            <img id='markerIMG' src={marker} alt='위치'/>
              {boardData.camp_address}
            </p>
            <p id="campdetailtitle">
              <span id="campdetail">전화번호 |</span> {boardData.camp_phone}
            </p>

            <p id="campdetailtitle">
              <span id="campdetail">성인 |</span> {boardData.camp_adult}명
            </p>
            <p id="campdetailtitle">
              <span id="campdetail">아동 |</span> {boardData.camp_child}명
            </p>
            <p id="campdetailtitle">
            <span id="campdetail">가격 |</span> {numberWithCommas(boardData.camp_price)}원
            </p>
            <p id="campdetailtitle">
              <span id="campdetail">시설 | </span>
              {boardData.camp_facility}
            </p>

            <div>
              <Button
                id="detailReservationButton"
                variant="primary"
                onClick={reserveMove}
                className="mt-3"
              >
                예약하기
              </Button>
              <checkbox className="like" id="heartButton" onClick={handleHeart}>
                {like ? (
                  <AiFillHeart style={{ color: "#FEA92A", fontSize: "30px" }} />
                  
                ) : (
                  <AiOutlineHeart style={{ fontSize: "30px" }} />

                )}
              </checkbox>
              <button id='linkCopy' onClick={handleCopy}><img src={copyIMG} id='copyIMG' alt='링크 복사'/></button>
            </div>
            <div id="updateAnddeleteButton2">
              {isCurrentUser &&(
                <div className="d-flex ">
                  <button
                    className="btn"
                    variant="primary"
                    onClick={handleUpdateClick}
                    id="detailReservationButton2"
                  >
                    <i className="fas fa-pen"></i> 수정하기
                  </button>
                </div>
              )}
              {isCurrentUser && (
                <button
                  onClick={handleDelete}
                  id="detailReservationButton2"
                  variant="primary"
                >
                  삭제
                </button>
              )}
            </div>
            
          </div>
        </div>
        <div id="CampdescriptionContainer">
          <div id="CampdescriptionBox">
            <p id="campdetaildescription">상세설명</p>
            <pre>{boardData.camp_description}</pre>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <button className="button" onClick={handlePrevPage}>{<FaAngleLeft size={30} />}</button>

        {boardData.camp_images &&
        boardData.camp_images.length > 0 &&
        boardData.camp_images[currentPage] ? (
          <img
            style={{ width: "800px", height: "600px", objectFit: "cover" }}
            src={boardData.camp_images[currentPage]}
            alt={`상품 이미지 ${currentPage + 1}`}
            onError={(e) => {
              e.target.onerror = null;
            }}
          />
        ) : (
          <p>이미지가 없습니다.</p>
        )}
        <button className="button" onClick={handleNextPage}>{<FaAngleRight size={30} />}</button>
      </div>
      
      <div id="campdetailmap">
        <h1 id="campdetailMapTitle">지도</h1>
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
      </div>

      <Reply />
    </section>
  );
}

export default CampBoardDetail;