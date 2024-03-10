import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import Particle from '../Particle';
import Aboutcard from './AboutCard';
import laptopImg from '../../../../Assets/12312.png';
import Toolstack from './Toolstack';

function About() {
  return (
    <Container fluid className="about-section">
      <Container>
        <Row style={{ justifyContent: 'center', padding: '10px' }}>
          <Col
            md={7}
            style={{
              justifyContent: 'center',
              paddingTop: '30px',
              paddingBottom: '50px',
            }}
          >
            <h1 style={{ fontSize: '2.1em', paddingBottom: '20px' }}>
              캠핑, 예약부터 막막하다면? <br />
              <strong className="purple">캠플리</strong>와 함께하세요!
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: '120px', paddingBottom: '50px' }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        <h1 className="project-heading">
          트래킹<strong className="purple"> X </strong>파이브가이즈
        </h1>
        <Toolstack />
      </Container>
    </Container>
  );
}

export default About;
