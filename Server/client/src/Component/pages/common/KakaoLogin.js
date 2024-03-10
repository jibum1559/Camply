import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import kakaoRegister from '../../img/Register/kakao_login_medium_narrow.png';

const Kakao = () => {
  const navigate = useNavigate();
  const kakaoClientId = 'e4e518b34dec41360511f03ad7a9ac61';
  
  const kakaoLoginSuccess = (res) => {
    const { access_token } = res.response;

    axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(userInfoResponse => {
      console.log("https://kapi.kakao.com/v2/user/me 성공")
      const email = userInfoResponse.data.kakao_account.email;
      const nickname = userInfoResponse.data.properties.nickname;
      console.log("email", email);
      console.log("nickname", nickname);

      axios.post('http://localhost:8080/getKakaoUserData', {
        access_token: access_token,
        email: email,
        nickname: nickname,
      }, {
        withCredentials: true,
      })
      .then(serverResponse => {
        localStorage.setItem("yourTokenKey", access_token);
        console.log(serverResponse.data);
        console.log("http://localhost:8080/getKakaoUserData 성공")
        alert("카카오 로그인 성공");
        window.location.href="http://localhost:3000/";
      })
      .catch(error => {
        console.error(error);
        alert("카카오 로그인 실패했습니다.");
      });
    })
    .catch(error => {
      console.error(error);
    });
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <div>
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoLoginSuccess}
          onFail={kakaoOnFailure}
        >
          <img src={kakaoRegister} alt="Kakao Register" />
        </KakaoLogin>
      </div>
    </>
  );
};

export default Kakao;
