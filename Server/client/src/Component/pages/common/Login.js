import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CampNavbar from "../camp/CampNavbar";
import KakaoLogin from "./KakaoLogin";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [USER_EMAIL, setEmail] = useState("");
  const [USER_PASSWORD, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const emailLogin = async () => {
    console.log("login button USER_EMAIL" + USER_EMAIL);
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          USER_EMAIL: USER_EMAIL,
          USER_PASSWORD: USER_PASSWORD,
        }),
      });

      if (response.ok) {
        const user_info = await response.json();
        console.log("Login successful. Member info:", user_info);

        setUserType(user_info.USER_TYPE);

        localStorage.setItem("yourTokenKey", user_info.token);
        setLoggedIn(true);
        navigate("/");
      } else {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다");
        console.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("yourTokenKey");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <section>
        <CampNavbar />
        <Container fluid className="home-section" id="home">
          <Container className="home-content"></Container>
        </Container>

        <LoginWrap>
          <LoginContainer>
            <LoginHeadLogo>
              <h1></h1>
            </LoginHeadLogo>
            <LoginHeadText>
              <NeedLogin>
                <BackgroundText>
                  <Text>로그인</Text>
                  <Background></Background>
                </BackgroundText>
                이 필요한 서비스 입니다.
              </NeedLogin>
            </LoginHeadText>
            <LoginSignupContent>
              <HorizontalButtons>
                <KakaoLogin />
              </HorizontalButtons>
            </LoginSignupContent>
            <LoginSigninContent>
              <BorderAndText>
                <span>이메일 로그인</span>
              </BorderAndText>
              <EmailLoginContainer>
                <div>
                  <EmailLoginInput
                    id="email"
                    type="email"
                    value={USER_EMAIL}
                    placeholder="이메일"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <EmailLoginInput
                    id="password"
                    type="password"
                    value={USER_PASSWORD}
                    placeholder="비밀번호"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <EmailLoginOption>
                  <div>
                    <InputCheckbox>
                      <Bp type="checkbox"></Bp>
                    </InputCheckbox>
                    <label>이메일 저장하기</label>
                  </div>
                  <a>아이디 / 비밀번호 찾기</a>
                </EmailLoginOption>
              </EmailLoginContainer>
              <CommonButton
                type="button"
                onClick={() => {
                  emailLogin();
                }}
              >
                로그인
              </CommonButton>

              <RegisterButton type="button">
                <Link to="/register">회원가입</Link>
              </RegisterButton>
            </LoginSigninContent>
          </LoginContainer>
        </LoginWrap>
      </section>
    </>
  );
}

const CommonButton = styled.button`
  margin-top: 6px;
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: none;
  background: #f1c333;
  color: #ffffff;
  font-size: 16px;
  line-height: 30px;
  padding: 0 16px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgb(220 220 220 / 30%);
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  vertical-align: middle;
`;

const RegisterButton = styled.button`
  margin-top: 6px;
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: none;
  background: green;
  color: #ffffff;
  font-size: 16px;
  line-height: 30px;
  padding: 0 16px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgb(220 220 220 / 30%);
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  vertical-align: middle;
`;

const Bp = styled.input`
  -webkit-appearance: none;
  background: transparent;
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  margin: 0;

  &:before {
    cursor: pointer;
    content: "";
    display: inline-block;
    line-height: 16px;
    width: 16px;
    height: 16px;
    background: #fff;
    position: absolute;
    top: 0px;
    left: 0px;
    border: 1px solid #acacac;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
  }
`;

const InputCheckbox = styled.div`
  display: inline-block;
`;

const EmailLoginOption = styled.div`
  padding: 13px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
  font-size: 11px;
`;

const EmailLoginInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 2px;
  border: 1px solid #b4b4b4;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  font-size: 14px;
  outline: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EmailLoginContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const LoginSigninContent = styled.div``;

const RadiusButton = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }

  &.kaako {
    padding-right: 4px;
    background: #3c5b96;
  }
`;

const HorizontalButtons = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const BorderAndText = styled.div`
  border-top: 1px solid #999999;
  color: #999999;
  display: flex;
  justify-content: center;

  span {
    font-size: 12px;
    margin-top: -8px;
    background: #ffffff;
    width: 130px;
    text-align: center;
  }
`;

const LoginSignupContent = styled.div``;

const NeedLogin = styled.p``;
const BackgroundText = styled.span``;
const Text = styled.strong``;
const Background = styled.span``;

const LoginHeadText = styled.div`
  margin-bottom: 30px;

  p {
    color: #333333;
    text-align: center;
  }

  ${NeedLogin} {
    display: flex;
    justify-content: center;
    font-size: 16px;
  }

  ${BackgroundText} {
    width: 50px;
    height: 19px;
    position: relative;

    > ${Text} {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    > ${Background} {
      width: 100%;
      height: 15px;
      background: #fbd3bc;
      position: absolute;
      top: 7px;
      left: 0;
    }
  }
`;

const LoginHeadLogo = styled.div`
  text-align: center;
  padding-top: 20px;
  margin-bottom: 10px;
`;

const LoginContainer = styled.div`
  background: #ffffff;

  @media (min-width: 720px) {
    padding: 1px 0 50px;
    width: 384px;
    display: block;
    margin: 0 auto;
  }
`;

const LoginWrap = styled.div`
  padding: 1px 0 50px;
  min-height: 100%;
  background: #fff;
`;

export default Login;
