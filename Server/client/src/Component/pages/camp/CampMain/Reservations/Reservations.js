import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ReservationCard from "./ReservationCards";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "../Reservations/Reservations.css";

function Reservations() {
  const [recentData, setRecentData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [seoulData, setSeoulData] = useState([]);
  const [gyeonggiData, setGyeonggiData] = useState([]);
  const [kangwonData, setKangwonData] = useState([]);
  const [seoulCurrentPage, setSeoulCurrentPage] = useState(1);
  const [gyeonggiCurrentPage, setGyeonggiCurrentPage] = useState(1);
  const [kangwonCurrentPage, setKangwonCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);
    }

    const fetchCampingData = async () => {
      try {
        const seoulResponse = await axios.get(
          `http://localhost:8080/camp/board/location/서울`
        );
        const gyeonggiResponse = await axios.get(
          `http://localhost:8080/camp/board/location/경기`
        );
        const kangwonResponse = await axios.get(
          `http://localhost:8080/camp/board/location/강원`
        );

        setSeoulData(seoulResponse.data);
        setGyeonggiData(gyeonggiResponse.data);
        setKangwonData(kangwonResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCampingData();
  }, []);

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/camp/board/all"
        );
        setRecentData(response.data);
      } catch (error) {
        console.error("Error fetching recent data:", error);
      }
    };

    fetchRecentData();
  }, []);

  const parseJwt = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken;
    } catch (e) {
      return null;
    }
  };

  const handleSeoulPrev = () => {
    setSeoulCurrentPage(
      seoulCurrentPage === 1 ? seoulCurrentPage : seoulCurrentPage - 1
    );
  };

  const handleSeoulNext = () => {
    setSeoulCurrentPage(
      seoulCurrentPage === Math.ceil(seoulData.length / 3)
        ? seoulCurrentPage
        : seoulCurrentPage + 1
    );
  };

  const handleGyeonggiPrev = () => {
    setGyeonggiCurrentPage(
      gyeonggiCurrentPage === 1 ? gyeonggiCurrentPage : gyeonggiCurrentPage - 1
    );
  };

  const handleGyeonggiNext = () => {
    setGyeonggiCurrentPage(
      gyeonggiCurrentPage === Math.ceil(gyeonggiData.length / 3)
        ? gyeonggiCurrentPage
        : gyeonggiCurrentPage + 1
    );
  };

  const handleKangwonPrev = () => {
    setKangwonCurrentPage(
      kangwonCurrentPage === 1 ? kangwonCurrentPage : kangwonCurrentPage - 1
    );
  };

  const handleKangwonNext = () => {
    setKangwonCurrentPage(
      kangwonCurrentPage === Math.ceil(kangwonData.length / 3)
        ? kangwonCurrentPage
        : kangwonCurrentPage + 1
    );
  };

  const handlePrev = () => {
    setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(
      currentPage === Math.ceil(recentData.length / 3)
        ? currentPage
        : currentPage + 1
    );
  };

  const handleRecentCampClick = (camp_id) => {
    navigate(`/camp/board/get/${camp_id}`);
  };

  return (
    <Container fluid className="project-section">
      <h1 className="project-heading">
        최근 <strong className="purple">캠핑장</strong> 예약하자
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="button1"
            
          >
            {<FaAngleLeft size={30} />}
          </button>{" "}
        </div>
        {recentData
          .slice((currentPage - 1) * 3, currentPage * 3)
          .map((camp) => (
            <Col key={camp.camp_id} md={2} className="project-card">
              <ReservationCard
                camp_id={camp.camp_id}
                camp_images={camp.camp_images}
                title={camp.camp_name}
                address={camp.camp_address}
                price={camp.camp_price}
                introduceLink={handleRecentCampClick}
                reservationsLink="#"
              />
            </Col>
          ))}

        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleNext}
            disabled={currentPage === Math.ceil(recentData.length / 3)}
            className="button2"
          >
            {<FaAngleRight size={30} />}
          </button>
        </div>
      </Row>

      <h1 className="project-heading">
        서울 <strong className="purple">캠핑장</strong> 예약하자
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleSeoulPrev}
            disabled={seoulCurrentPage === 1}
            className="button1"
          >
            {<FaAngleLeft size={30} />}
          </button>{" "}
        </div>
        {seoulData
          .slice((seoulCurrentPage - 1) * 3, seoulCurrentPage * 3)
          .map((camp) => (
            <Col key={camp.camp_id} md={2} className="project-card">
              <ReservationCard
                camp_id={camp.camp_id}
                camp_images={camp.camp_images}
                title={camp.camp_name}
                address={camp.camp_address}
                price={camp.camp_price}
                introduceLink={handleRecentCampClick}
                reservationsLink="#"
              />
            </Col>
          ))}
        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleSeoulNext}
            disabled={seoulCurrentPage === Math.ceil(seoulData.length / 3)}
            className="button2"
          >
            {<FaAngleRight size={30} />}
          </button>
        </div>
      </Row>

      <h1 className="project-heading">
        경기 <strong className="purple">캠핑장</strong> 예약하자
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleGyeonggiPrev}
            disabled={gyeonggiCurrentPage === 1}
            className="button1"
          >
            {<FaAngleLeft size={30} />}
          </button>{" "}
        </div>
        {gyeonggiData
          .slice((gyeonggiCurrentPage - 1) * 3, gyeonggiCurrentPage * 3)
          .map((camp) => (
            <Col key={camp.camp_id} md={2} className="project-card">
              <ReservationCard
                camp_id={camp.camp_id}
                camp_images={camp.camp_images}
                title={camp.camp_name}
                address={camp.camp_address}
                price={camp.camp_price}
                introduceLink={handleRecentCampClick}
                reservationsLink="#"
              />
            </Col>
          ))}
        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleGyeonggiNext}
            disabled={
              gyeonggiCurrentPage === Math.ceil(gyeonggiData.length / 3)
            }
            className="button2"
          >
            {<FaAngleRight size={30} />}
          </button>
        </div>
      </Row>

      <h1 className="project-heading">
        강원 <strong className="purple">캠핑장</strong> 예약하자
      </h1>

      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleKangwonPrev}
            disabled={kangwonCurrentPage === 1}
            className="button1"
          >
            {<FaAngleLeft size={30} />}
          </button>{" "}
        </div>
        {kangwonData
          .slice((kangwonCurrentPage - 1) * 3, kangwonCurrentPage * 3)
          .map((camp) => (
            <Col key={camp.camp_id} md={2} className="project-card">
              <ReservationCard
                camp_id={camp.camp_id}
                camp_images={camp.camp_images}
                title={camp.camp_name}
                address={camp.camp_address}
                price={camp.camp_price}
                introduceLink={handleRecentCampClick}
                reservationsLink="#"
              />
            </Col>
          ))}

        <div class="project-card col-md-2">
          <button
            variant="primary"
            onClick={handleKangwonNext}
            disabled={kangwonCurrentPage === Math.ceil(kangwonData.length / 3)}
            className="button2"
          >
            {<FaAngleRight size={30} />}
          </button>
        </div>
      </Row>
    </Container>
  );
}

export default Reservations;
