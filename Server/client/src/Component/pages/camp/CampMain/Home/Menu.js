import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCampground } from "react-icons/fa";
import { TbCampfire } from "react-icons/tb";
import { GiHabitatDome } from "react-icons/gi";
import { TbCaravan } from "react-icons/tb";
import { GiWoodCabin } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";


function Menu() {
  const navigate = useNavigate();

  const campingLinks = [
    {
      href: "/camp/board/tent",
      icon: <FaCampground />,
      text: "텐트",
    },
    {
      href: "/camp/board/glamping",
      icon: <GiHabitatDome />,
      text: "글램핑",
    },
    {
      href: "/camp/board/caravan",
      icon: <TbCaravan />,
      text: "카라반",
    },
    {
      href: "/camp/board/site",
      icon: <TbCampfire />,
      text: "야영장",
    },
    {
      href: "/camp/board/pension",
      icon: <GiWoodCabin />,
      text: "펜션",
    },
  ];

  const campingSearch = [
    {
      href: "/camp/searchList",
      icon: <CiSearch />,
      text: "전체 검색",
    },
  ];
  

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        
      <Row className="justify-content-center">
          <Col md={10} className="home-about-social">
            <Row className="justify-content-center">
              {campingSearch.map((searchItem, index) => (
                <Col md={10} key={index} className="social-icons">
                  <Link to={searchItem.href} className="card-link">
                    <Card
                      className="border-0 text-center"
                      style={{
                        borderRadius: "15px",
                        padding: "10px",
                        border: "2px solid #fea92a",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Card.Body>
                        <Link to={searchItem.href} className="icon-colour home-social-icons">
                          {searchItem.icon}
                        </Link>
                        <p>
                          <Link to={searchItem.href}>{searchItem.text}</Link>
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10} className="home-about-social">
            <Row className="justify-content-center">
              {campingLinks.map((link, index) => (
                <Col md={2} key={index} className="social-icons">
                  <Link to={link.href} className="card-link">
                  <Card
                    className="border-0 text-center"
                    style={{
                      borderRadius: "15px",
                      padding: "10px",
                      border: "2px solid #fea92a",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Card.Body>
                      <Card.Link
                        onClick={() => navigate(link.href)}
                        className="icon-colour home-social-icons"
                      >
                        {link.icon}
                      </Card.Link>
                      <p>{link.text}</p>
                    </Card.Body>
                  </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

      </Container>
    </Container>
  );
}

export default Menu;
