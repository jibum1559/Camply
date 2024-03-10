import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import homeLogo from '../../../../Assets/12312.png';
//import Particle from '../Particle';
import Menu from './Menu';
import Type from './Type';
import Reservations from '../Reservations/Reservations';


function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={6} className="img-fluid mt-5 py-3 px-5 ">
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: '350px' }}
              />
            </Col>
            <Col md={6} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                환영해요!{' '}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                <strong className="main-name">캠플리 </strong>
                <br />
                캠핑장 예약 사이트에요.
              </h1>

              <div style={{ padding: 50, textAlign: 'left' }}>
                <Type />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Menu />
      <Reservations />

    </section>
  );
}

export default Home;
