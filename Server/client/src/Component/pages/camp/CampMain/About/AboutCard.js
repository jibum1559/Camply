import React from 'react';
import Card from 'react-bootstrap/Card';
import { ImPointRight } from 'react-icons/im';

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: 'justify' }}>
            <span className="purple">캠핑 정보가 한 눈에 보여요. </span>
            반드시 알아야 할 <span className="purple"> 캠핑장 정보들을</span>
            <br />
            직관적으로 확인하고 예약하세요.
            <br />
            <span className="purple">다른 사이트 이동없이 바로 예약해요. </span>
            <br />
            번거롭게 다른 사이트로 이동하지 않고 파이브가이즈에서 예약부터
            결제까지 해결하세요.
            <br />
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> 회원가입 / 로그인
            </li>
            <li className="about-activity">
              <ImPointRight /> 예약하기
            </li>
            <li className="about-activity">
              <ImPointRight /> 문의하기
            </li>
          </ul>

          <p style={{ color: 'black' }}>
            "캠핑이란 남을 따라서 하는 게 아니라, 자기 멋에 맞춰 즐기고 새로운
            것을 창조하는 것이다."{' '}
          </p>
          <footer className="blockquote-footer">
            파이브가이즈 창업주 신재헌 회장
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
