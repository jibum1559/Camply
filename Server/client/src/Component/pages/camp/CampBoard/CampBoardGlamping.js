import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/CampBoardAll.css";
import '../CampBoard/css/SearchList.css';
import { Container } from "react-bootstrap";
import CampNavbar from "../CampNavbar";
import tentIMG from '../../../img/글램핑.jpg';
import Menu from '../CampMain/Home/Menu';


function CampBoardTent() {
  const [boardData, setBoardData] = useState([]);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.USER_TYPE);
      console.log("Decoded Token:", decodedToken);
    }

    const camp_select = "글램핑";
    const encodedCampSelect = encodeURIComponent(camp_select);

    axios
      .get(`http://localhost:8080/camp/board/category/${encodedCampSelect}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const decodedData = new TextDecoder("utf-8").decode(response.data);
        const jsonData = JSON.parse(decodedData);
        setBoardData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const parseJwt = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      const decodeUTF8Fields = (fields) => {
        return Object.fromEntries(
          Object.entries(fields).map(([key, value]) => [
            key,
            decodeURIComponent(escape(value)),
          ])
        );
      };

      const decodedUser = {
        ...decodedToken,
        ...decodeUTF8Fields({
          user_name: decodedToken.user_name,
          user_address: decodedToken.user_address,
          user_businessaddress: decodedToken.user_businessaddress,
        }),
      };

      return {
        ...decodedUser,
        USER_TYPE: decodedUser.auth.includes("Admin") ? "Admin" : "User",
      };
    } catch (e) {
      return null;
    }
  };

  const handleRowClick = (camp_id) => {
    window.location.href = `/camp/board/get/${camp_id}`;
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

      <Menu/>
      
      <h1 id='tentSearchTitle'>글램핑</h1>
      <div id='tentContainer'>
          {boardData.map((board) =>
            board?(
              <div id='tentResultBox'
                key={board.camp_id}
                onClick={() => handleRowClick(board.camp_id)}
              >
                <img src={board.camp_images.split(";")} alt='텐트' id='tentIMG'></img>
               <div id='firstTentBox'>
                <p id='tentType'>{board.camp_select}</p>
                <p id='tentName'>{board.camp_name}</p>
                <p id='tentLocation'>{board.camp_location}</p>
                </div>
                <div>
                <p id='Campdescription'>(1박기준)</p>
                <p id='tentPrice'>{numberWithCommas(board.camp_price)}원</p>
                </div>
                <hr id='tentHrbar'/>
              </div>
            ) : null
          )}
          </div>
    </section>
  );
}

export default CampBoardTent;
