import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { IoMdSunny } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { CgChevronDownO } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../../img/MainImg/logo-removebg-preview.png";
import OpenWeatherMap from "../camp/CampMain/Home/openWeatherMap";
import { GiCampingTent } from "react-icons/gi";
import { MdAddShoppingCart } from "react-icons/md";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { LuUserCircle2 } from "react-icons/lu";
import { VscInfo } from "react-icons/vsc";
import axios from "axios";


function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isShopPath = currentPath.startsWith("/shop");
  const isCampPath = currentPath.startsWith("/camp");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  const handleWeatherModalClose = () => setShowWeatherModal(false);
  const handleWeatherModalShow = () => setShowWeatherModal(true);
  const currentPage = location.pathname;

  const [decodedToken, setDecodedToken] = useState({});

  const parseUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload.user_id;
    } catch (error) {
      console.error("parseUserIdFromToken", error);
      return null;
    }
  };

  const [userType, setUserType] = useState("");

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
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
        });
    }
  }, []);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("yourTokenKey");
    setLoggedIn(false);
    navigate("/login");
  };

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
          console.log("User Data Response USER_TYPE:", response.data.USER_TYPE);
          setUserType(response.data.USER_TYPE);
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
        });
    }
  }, []);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("USER_TYPE:", decodedToken.USER_TYPE);
  }, [isLoggedIn, decodedToken.USER_TYPE]);

  useEffect(() => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      setLoggedIn(true);
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((userInfoResponse) => {
          const email = userInfoResponse.data.kakao_account.email;
          console.log("User Email:", email);
          axios
            .get(`http://localhost:8080/api/user/kakao/${email}`)
            .then((response) => {
              const userType = response.data.USER_TYPE;
              console.log("User Type:", userType);
              setUserType(userType);
            })
            .catch((error) => {
              console.error("Error fetching user type:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img
            src={logo}
            className="logo"
            alt="brand"
            style={{ width: '130px', height: 'auto' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/camp"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineHome style={{ marginBottom: "2px" }} /> 홈페이지
              </Nav.Link>
            </Nav.Item>

            {isCampPath && (
              <>
                {isLoggedIn && userType === "Admin" && (
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/camp/board/add"
                      onClick={() => updateExpanded(false)}
                    >
                      <MdFormatListBulletedAdd
                        style={{ marginBottom: "2px" }}
                      />{" "}
                      캠핑장 등록
                    </Nav.Link>
                  </Nav.Item>
                )}

                <Nav.Item>
                  <Nav.Link href="#" onClick={handleWeatherModalShow}>
                    <IoMdSunny style={{ marginBottom: "2px" }} /> 날씨
                  </Nav.Link>
                </Nav.Item>

                <Modal show={showWeatherModal} onHide={handleWeatherModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>날씨</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <OpenWeatherMap />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleWeatherModalClose}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/shop/main"
                    onClick={() => updateExpanded(false)}
                  >
                    <PiShoppingBagOpenLight style={{ marginBottom: "2px" }} />{" "}
                    쇼핑몰
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            {isShopPath && (
              <>
                {isLoggedIn && (
                  <>
                    {isLoggedIn && userType === "Admin" && (
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to="/shop/seller"
                          onClick={() => updateExpanded(false)}
                        >
                          <MdAddShoppingCart style={{ marginBottom: "2px" }} />{" "}
                          판매자 관리
                        </Nav.Link>
                      </Nav.Item>
                    )}
                    <>
                      {isLoggedIn && userType === "General" && (
                        <Nav.Item>
                          <Nav.Link
                            as={Link}
                            to="/shop/mycart/:userId"
                            onClick={() => updateExpanded(false)}
                          >
                            <FiShoppingCart style={{ marginBottom: "2px" }} />{" "}
                            장바구니
                          </Nav.Link>
                        </Nav.Item>
                      )}
                      <>
                        {isLoggedIn && userType === "General" && (
                          <Nav.Item>
                            <Nav.Link
                              as={Link}
                              to="/shop/mypage/general/myorder/view:userId"
                              onClick={() => updateExpanded(false)}
                            >
                              <FiShoppingCart style={{ marginBottom: "2px" }} />{" "}
                              결제관리
                            </Nav.Link>
                          </Nav.Item>
                        )}
                      </>
                    </>
                  </>
                )}

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/camp"
                    onClick={() => updateExpanded(false)}
                  >
                    <GiCampingTent style={{ marginBottom: "2px" }} /> 캠핑장
                    예약
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
      
                          
            {isCampPath && (
              <>
                {isLoggedIn && userType === "General" && (
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/myCamping/info"
                      onClick={() => updateExpanded(false)}
                    >
                      <VscInfo style={{ marginBottom: "2px" }} />{" "}
                      캠핑정보
                    </Nav.Link>
                  </Nav.Item>
                )}
                <>
                  {isLoggedIn && userType === "Admin" && (
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        to="/sellermypage/info"
                        onClick={() => updateExpanded(false)}
                      >
                        <VscInfo style={{ marginBottom: "2px" }} />{" "}
                        캠핑정보
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </>
              </>
            )}

            {isLoggedIn && (
              <>
                {isLoggedIn && userType === "General" && (
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/mypage"
                      onClick={() => updateExpanded(false)}
                    >
                      <LuUserCircle2 style={{ marginBottom: "2px" }} />{" "}
                      마이페이지
                    </Nav.Link>
                  </Nav.Item>
                )}
                <>
                  {isLoggedIn && userType === "Admin" && (
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        to="/mypage"
                        onClick={() => updateExpanded(false)}
                      >
                        <LuUserCircle2 style={{ marginBottom: "2px" }} />{" "}
                        마이페이지
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </>
              </>
            )}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to={isLoggedIn ? "/login" : "/login"}
                onClick={handleLogout}
              >
                {isLoggedIn ? (
                  <CgCloseO style={{ marginBottom: "2px" }} />
                ) : (
                  <CgChevronDownO style={{ marginBottom: "2px" }} />
                )}
                {isLoggedIn ? "로그아웃" : "로그인"}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
