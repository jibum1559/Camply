import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CampReserve.css";
import Nav from "../CampNavbar";
import { FaCheck } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import { Button, Alert } from "@mui/material";
import { FaAngleRight, FaBackspace } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";
const CampReserve = () => {
  useEffect(() => {
    // Add script tags dynamically to the document head
    const iamportScript = document.createElement("script");
    iamportScript.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(iamportScript);
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    jqueryScript.type = "text/javascript";
    document.head.appendChild(jqueryScript);
    const iamportPaymentScript = document.createElement("script");
    iamportPaymentScript.src =
      "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    iamportPaymentScript.type = "text/javascript";
    document.head.appendChild(iamportPaymentScript);
    // Clean up function to remove dynamically added scripts on unmount
    return () => {
      document.head.removeChild(iamportScript);
      document.head.removeChild(jqueryScript);
      document.head.removeChild(iamportPaymentScript);
    };
  }, []);
  const location = useLocation();
  const [CAMP_USER_PHONE, setUserPhone] = useState("");
  const [CAMP_USER_EMAIL, setUserEmail] = useState("");
  const [CAMP_USER_NAME, setUserName] = useState("");
  const [reserve, setReserve] = useState();
  const navigate = useNavigate();
  const handlemarketing = () => {
    alert("마케팅 정보 동의");
  };
  const handlebackbtn = () => {
    const confirmCancellation = window.confirm("예약을 취소하시겠습니까?");
    if (confirmCancellation) {
      alert("예약이 취소되었습니다.");
      navigate(`/camp/searchList`);
    } else {
      alert("취소가 취소되었습니다.");
    }
  };

  const finishhand = () => {
    alert("예약완료.");
    navigate(`/camp/searchList`);
  };

  const token = localStorage.getItem("yourTokenKey");
  const parseUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload.user_id;
    } catch (error) {
      console.error("parseUserIdFromToken", error);
      return null;
    }
  };
  
  // 상세페이지에서 데이터 받기
  const reserveInfo = { ...location.state };

  const nowDate = new Date();
  console.log(
    "code_check reserveInfo CAMP_CHECKIN : " + reserveInfo.CAMP_CHECKIN
  );
  console.log(
    "code_check reserveInfo CAMP_CHECKOUT : " + reserveInfo.CAMP_CHECKOUT
  );

  const handleOrderbtn = async () => {
    const confirmOrder = window.confirm("결제를 진행 하시겠습니까?");
    if (confirmOrder) {
      const USER_ID = parseUserIdFromToken(token);
      if (token) {
        // 테스트때마다 중복되면 안되는 값이 여야 함
        const uid = USER_ID + "_" + nowDate;
        const IMP = window.IMP;

        IMP.init("imp47518323");

        IMP.request_pay(
          {
            // param
            pg: "mobilians.170622040674",
            pay_method: "card",
            merchant_uid: uid, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
            name: reserveInfo.CAMP_NAME, //결제창에 노출될 상품명
            // amount: reserveInfo.CAMP_PRICE, //금액 테스트 결제를위해 금액변경
            amount: "100",
            buyer_email: CAMP_USER_EMAIL,
            buyer_name: CAMP_USER_NAME,
            buyer_tel: CAMP_USER_PHONE,
          },
          (rsp) => {
            console.log("USER_ID : " + USER_ID);
            console.log("CAMP_CHECKIN : " + reserveInfo.CAMP_CHECKIN);
            console.log("CAMP_CHECKOUT : " + reserveInfo.CAMP_CHECKOUT);
            console.log("ALLOWED_USERS_ADULT : " + reserveInfo.CAMP_ADULT);
            console.log("ALLOWED_USERS_CHILD : " + reserveInfo.CAMP_CHILD);
            console.log("COMPLETE_PAYMENT : " + nowDate);
            console.log("CAMP_USER_PHONE : " + CAMP_USER_PHONE);
            console.log("CAMP_USER_EMAIL : " + CAMP_USER_EMAIL);
            console.log("CAMP_ID : " + reserveInfo.CAMP_ID);
            console.log("CAMP_NAME : " + reserveInfo.CAMP_NAME);
            console.log("CAMP_PRICE : " + reserveInfo.CAMP_PRICE);
            try {
              axios
                .post(
                  "http://localhost:8080/camp/reserve",
                  {
                    USER_ID: USER_ID,
                    CAMP_CHECKIN: reserveInfo.CAMP_CHECKIN,
                    CAMP_CHECKOUT: reserveInfo.CAMP_CHECKOUT,
                    ALLOWED_USERS_ADULT: reserveInfo.CAMP_ADULT,
                    ALLOWED_USERS_CHILD: reserveInfo.CAMP_CHILD,
                    COMPLETE_PAYMENT: nowDate,
                    CAMP_USER_PHONE: CAMP_USER_PHONE,
                    CAMP_USER_EMAIL: CAMP_USER_EMAIL,
                    CAMP_ID: reserveInfo.CAMP_ID,
                    TOTAL_PRICE: reserveInfo.CAMP_PRICE,
                    CAMP_NAME: reserveInfo.CAMP_NAME,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    finishhand();
                  } else {
                    console.error("Reserve failed");
                  }
                })
                .catch((error) => {
                  console.error("Error during registration:", error);
                });
            } catch (error) {
              console.error("Error during registration:", error);
            }
          }
        );
      } else {
        console.error("Reserve failed");
      }
    } else {
      <Alert severity="error">예약이 취소 되었습니다. 다시 해주세요.</Alert>;
    }
  };

  return (
    <>
      <Nav />
      <div className="main-container-box">
        <div className="main-container">
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="container-box"
          >
            <div className="Reserve-container">
              <form className="customerInfo">
                <div>
                  <h3 style={{ display: "flex", justifyContent: "start" }}>
                    체크인 고객 정보
                  </h3>
                  <p>
                    <b>예약정보:</b> {reserveInfo.CAMP_SELECT}, 성인
                    {reserveInfo.CAMP_ADULT}명, 어린이{reserveInfo.CAMP_CHILD}명
                  </p>
                  <p style={{ fontSize: "13px", marginLeft: "20px" }}>
                    <p style={{ color: "green" }}>
                      <FaCheck />
                      무료주차 <FaCheck />
                      무료WiFi
                    </p>
                  </p>
                </div>
                <div className="guest-room">
                  <div className="addGuest">
                    <div className="addGuest-container"></div>
                  </div>
                  <div className="name">
                    <div className="Name input">
                      <p className="input-label">
                        이름
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <input
                        className="nameInput"
                        placeholder="(예:홍길동/HongGildong)"
                        name="Name"
                        value={CAMP_USER_NAME}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="userPhone">
                  <p>
                    휴대폰 번호<sapn className="required">*</sapn>
                  </p>
                  <select name="countryCode" className="national">
                    <option data-countryCode="KR" value="82" Selected>
                      대한민국 (+82)
                    </option>
                    <option data-countryCode="GB" value="44">
                      영국 (+44)
                    </option>
                    <option data-countryCode="US" value="1">
                      미국 (+1)
                    </option>
                    <optgroup label="다른 국가">
                      <option data-countryCode="DZ" value="213">
                        알제리 (+213)
                      </option>
                      <option data-countryCode="AD" value="376">
                        안도라 (+376)
                      </option>
                      <option data-countryCode="AO" value="244">
                        앙골라 (+244)
                      </option>
                      <option data-countryCode="AI" value="1264">
                        앵귈라 (+1264)
                      </option>
                      <option data-countryCode="AG" value="1268">
                        앤티가 바부다 (+1268)
                      </option>
                      <option data-countryCode="AR" value="54">
                        아르헨티나 (+54)
                      </option>
                      <option data-countryCode="AM" value="374">
                        아르메니아 (+374)
                      </option>
                      <option data-countryCode="AW" value="297">
                        아루바 (+297)
                      </option>
                      <option data-countryCode="AU" value="61">
                        오스트레일리아 (+61)
                      </option>
                      <option data-countryCode="AT" value="43">
                        오스트리아 (+43)
                      </option>
                      <option data-countryCode="AZ" value="994">
                        아제르바이잔 (+994)
                      </option>
                      <option data-countryCode="BS" value="1242">
                        바하마 (+1242)
                      </option>
                      <option data-countryCode="BH" value="973">
                        바레인 (+973)
                      </option>
                      <option data-countryCode="BD" value="880">
                        방글라데시 (+880)
                      </option>
                      <option data-countryCode="BB" value="1246">
                        바베이도스 (+1246)
                      </option>
                      <option data-countryCode="BY" value="375">
                        벨라루스 (+375)
                      </option>
                      <option data-countryCode="BE" value="32">
                        벨기에 (+32)
                      </option>
                      <option data-countryCode="BZ" value="501">
                        벨리즈 (+501)
                      </option>
                      <option data-countryCode="BJ" value="229">
                        베냉 (+229)
                      </option>
                      <option data-countryCode="BM" value="1441">
                        버뮤다 (+1441)
                      </option>
                      <option data-countryCode="BT" value="975">
                        부탄 (+975)
                      </option>
                      <option data-countryCode="BO" value="591">
                        볼리비아 (+591)
                      </option>
                      <option data-countryCode="BA" value="387">
                        보스니아 헤르체고비나 (+387)
                      </option>
                      <option data-countryCode="BW" value="267">
                        보츠와나 (+267)
                      </option>
                      <option data-countryCode="BR" value="55">
                        브라질 (+55)
                      </option>
                      <option data-countryCode="BN" value="673">
                        브루나이 (+673)
                      </option>
                      <option data-countryCode="BG" value="359">
                        불가리아 (+359)
                      </option>
                      <option data-countryCode="BF" value="226">
                        부르키나파소 (+226)
                      </option>
                      <option data-countryCode="BI" value="257">
                        부룬디 (+257)
                      </option>
                      <option data-countryCode="KH" value="855">
                        캄보디아 (+855)
                      </option>
                      <option data-countryCode="CM" value="237">
                        카메룬 (+237)
                      </option>
                      <option data-countryCode="CA" value="1">
                        캐나다 (+1)
                      </option>
                      <option data-countryCode="CV" value="238">
                        카보베르데 (+238)
                      </option>
                      <option data-countryCode="KY" value="1345">
                        케이맨 제도 (+1345)
                      </option>
                      <option data-countryCode="CF" value="236">
                        중앙 아프리카 공화국 (+236)
                      </option>
                      <option data-countryCode="CL" value="56">
                        칠레 (+56)
                      </option>
                      <option data-countryCode="CN" value="86">
                        중국 (+86)
                      </option>
                      <option data-countryCode="CO" value="57">
                        콜롬비아 (+57)
                      </option>
                      <option data-countryCode="KM" value="269">
                        코모로 (+269)
                      </option>
                      <option data-countryCode="CG" value="242">
                        콩고 (+242)
                      </option>
                      <option data-countryCode="CK" value="682">
                        쿡 제도 (+682)
                      </option>
                      <option data-countryCode="CR" value="506">
                        코스타리카 (+506)
                      </option>
                      <option data-countryCode="HR" value="385">
                        크로아티아 (+385)
                      </option>
                      <option data-countryCode="CU" value="53">
                        쿠바 (+53)
                      </option>
                      <option data-countryCode="CY" value="90392">
                        키프로스 북 (+90392)
                      </option>
                      <option data-countryCode="CY" value="357">
                        키프로스 남 (+357)
                      </option>
                      <option data-countryCode="CZ" value="42">
                        체코 공화국 (+42)
                      </option>
                      <option data-countryCode="DK" value="45">
                        덴마크 (+45)
                      </option>
                      <option data-countryCode="DJ" value="253">
                        지부티 (+253)
                      </option>
                      <option data-countryCode="DM" value="1809">
                        도미니카 (+1809)
                      </option>
                      <option data-countryCode="DO" value="1809">
                        도미니카 공화국 (+1809)
                      </option>
                      <option data-countryCode="EC" value="593">
                        에콰도르 (+593)
                      </option>
                      <option data-countryCode="EG" value="20">
                        이집트 (+20)
                      </option>
                      <option data-countryCode="SV" value="503">
                        엘살바도르 (+503)
                      </option>
                      <option data-countryCode="GQ" value="240">
                        적도 기니 (+240)
                      </option>
                      <option data-countryCode="ER" value="291">
                        에리트레아 (+291)
                      </option>
                      <option data-countryCode="EE" value="372">
                        에스토니아 (+372)
                      </option>
                      <option data-countryCode="ET" value="251">
                        에티오피 (+251)
                      </option>
                      <option data-countryCode="FK" value="500">
                        포클랜드 제도 (+500)
                      </option>
                      <option data-countryCode="FO" value="298">
                        페로 제도 (+298)
                      </option>
                      <option data-countryCode="FJ" value="679">
                        피지 (+679)
                      </option>
                      <option data-countryCode="FI" value="358">
                        핀란드 (+358)
                      </option>
                      <option data-countryCode="FR" value="33">
                        프랑스 (+33)
                      </option>
                      <option data-countryCode="GF" value="594">
                        프랑스령 기아나 (+594)
                      </option>
                      <option data-countryCode="PF" value="689">
                        프랑스령 폴리네시아 (+689)
                      </option>
                      <option data-countryCode="GA" value="241">
                        가봉 (+241)
                      </option>
                      <option data-countryCode="GM" value="220">
                        감비아 (+220)
                      </option>
                      <option data-countryCode="GE" value="7880">
                        조지아 (+7880)
                      </option>
                      <option data-countryCode="DE" value="49">
                        독일 (+49)
                      </option>
                      <option data-countryCode="GH" value="233">
                        가나 (+233)
                      </option>
                      <option data-countryCode="GI" value="350">
                        지브롤터 (+350)
                      </option>
                      <option data-countryCode="GR" value="30">
                        그리스 (+30)
                      </option>
                      <option data-countryCode="GL" value="299">
                        그린란드 (+299)
                      </option>
                      <option data-countryCode="GD" value="1473">
                        그레나다 (+1473)
                      </option>
                      <option data-countryCode="GP" value="590">
                        과들루프 (+590)
                      </option>
                      <option data-countryCode="GU" value="671">
                        괌 (+671)
                      </option>
                      <option data-countryCode="GT" value="502">
                        과테말라 (+502)
                      </option>
                      <option data-countryCode="GN" value="224">
                        기니 (+224)
                      </option>
                      <option data-countryCode="GW" value="245">
                        기니-비사우 (+245)
                      </option>
                      <option data-countryCode="GY" value="592">
                        가이아나 (+592)
                      </option>
                      <option data-countryCode="HT" value="509">
                        아이티 (+509)
                      </option>
                      <option data-countryCode="HN" value="504">
                        온두라스 (+504)
                      </option>
                      <option data-countryCode="HK" value="852">
                        홍콩 (+852)
                      </option>
                      <option data-countryCode="HU" value="36">
                        헝가리 (+36)
                      </option>
                      <option data-countryCode="IS" value="354">
                        아이슬란드 (+354)
                      </option>
                      <option data-countryCode="IN" value="91">
                        인도 (+91)
                      </option>
                      <option data-countryCode="ID" value="62">
                        인도네시아 (+62)
                      </option>
                      <option data-countryCode="IR" value="98">
                        이란 (+98)
                      </option>
                      <option data-countryCode="IQ" value="964">
                        이라크 (+964)
                      </option>
                      <option data-countryCode="IE" value="353">
                        아일랜드 (+353)
                      </option>
                      <option data-countryCode="IL" value="972">
                        이스라엘 (+972)
                      </option>
                      <option data-countryCode="IT" value="39">
                        이탈리아 (+39)
                      </option>
                      <option data-countryCode="JM" value="1876">
                        자메이카 (+1876)
                      </option>
                      <option data-countryCode="JP" value="81">
                        일본 (+81)
                      </option>
                      <option data-countryCode="JO" value="962">
                        요르단 (+962)
                      </option>
                      <option data-countryCode="KZ" value="7">
                        카자흐스탄 (+7)
                      </option>
                      <option data-countryCode="KE" value="254">
                        케냐 (+254)
                      </option>
                      <option data-countryCode="KI" value="686">
                        키리바시 (+686)
                      </option>
                      <option data-countryCode="KP" value="850">
                        조선민주주의인민공화국 (+850)
                      </option>
                      <option data-countryCode="KR" value="82">
                        대한민국 (+82)
                      </option>
                      <option data-countryCode="KW" value="965">
                        쿠웨이트 (+965)
                      </option>
                      <option data-countryCode="KG" value="996">
                        키르기스스탄 (+996)
                      </option>
                      <option data-countryCode="LA" value="856">
                        라오스 (+856)
                      </option>
                      <option data-countryCode="LV" value="371">
                        라트비아 (+371)
                      </option>
                      <option data-countryCode="LB" value="961">
                        레바논 (+961)
                      </option>
                      <option data-countryCode="LS" value="266">
                        레소토 (+266)
                      </option>
                      <option data-countryCode="LR" value="231">
                        리베리아 (+231)
                      </option>
                      <option data-countryCode="LY" value="218">
                        리비아 (+218)
                      </option>
                      <option data-countryCode="LI" value="417">
                        리히텐슈타인 (+417)
                      </option>
                      <option data-countryCode="LT" value="370">
                        리투아니아 (+370)
                      </option>
                      <option data-countryCode="LU" value="352">
                        룩셈부르크 (+352)
                      </option>
                      <option data-countryCode="MO" value="853">
                        마카오 (+853)
                      </option>
                      <option data-countryCode="MK" value="389">
                        마케도니아 (+389)
                      </option>
                      <option data-countryCode="MG" value="261">
                        마다가스카르 (+261)
                      </option>
                      <option data-countryCode="MW" value="265">
                        말라위 (+265)
                      </option>
                      <option data-countryCode="MY" value="60">
                        말레이시아 (+60)
                      </option>
                      <option data-countryCode="MV" value="960">
                        몰디브 (+960)
                      </option>
                      <option data-countryCode="ML" value="223">
                        말리 (+223)
                      </option>
                      <option data-countryCode="MT" value="356">
                        몰타 (+356)
                      </option>
                      <option data-countryCode="MH" value="692">
                        마셜 제도 (+692)
                      </option>
                      <option data-countryCode="MQ" value="596">
                        마르티니크 (+596)
                      </option>
                      <option data-countryCode="MR" value="222">
                        모리타니아 (+222)
                      </option>
                      <option data-countryCode="YT" value="269">
                        마요트 (+269)
                      </option>
                      <option data-countryCode="MX" value="52">
                        멕시코 (+52)
                      </option>
                      <option data-countryCode="FM" value="691">
                        미크로네시아 연방 (+691)
                      </option>
                      <option data-countryCode="MD" value="373">
                        몰도바 (+373)
                      </option>
                      <option data-countryCode="MC" value="377">
                        모나코 (+377)
                      </option>
                      <option data-countryCode="MN" value="976">
                        몽골 (+976)
                      </option>
                      <option data-countryCode="MS" value="1664">
                        몬트세랫 (+1664)
                      </option>
                      <option data-countryCode="MA" value="212">
                        모로코 (+212)
                      </option>
                      <option data-countryCode="MZ" value="258">
                        모잠비크 (+258)
                      </option>
                      <option data-countryCode="MN" value="95">
                        미얀마 (+95)
                      </option>
                      <option data-countryCode="NA" value="264">
                        나미비아 (+264)
                      </option>
                      <option data-countryCode="NR" value="674">
                        나우루 (+674)
                      </option>
                      <option data-countryCode="NP" value="977">
                        네팔 (+977)
                      </option>
                      <option data-countryCode="NL" value="31">
                        네덜란드 (+31)
                      </option>
                      <option data-countryCode="NC" value="687">
                        뉴칼레도니아 (+687)
                      </option>
                      <option data-countryCode="NZ" value="64">
                        뉴질랜드 (+64)
                      </option>
                      <option data-countryCode="NI" value="505">
                        니카라과 (+505)
                      </option>
                      <option data-countryCode="NE" value="227">
                        니제르 (+227)
                      </option>
                      <option data-countryCode="NG" value="234">
                        나이지리아 (+234)
                      </option>
                      <option data-countryCode="NU" value="683">
                        니우에 (+683)
                      </option>
                      <option data-countryCode="NF" value="672">
                        노퍽섬 (+672)
                      </option>
                      <option data-countryCode="NP" value="670">
                        북마리아나 제도 (+670)
                      </option>
                      <option data-countryCode="NO" value="47">
                        노르웨이 (+47)
                      </option>
                      <option data-countryCode="OM" value="968">
                        오만 (+968)
                      </option>
                      <option data-countryCode="PW" value="680">
                        팔라우 (+680)
                      </option>
                      <option data-countryCode="PA" value="507">
                        파나마 (+507)
                      </option>
                      <option data-countryCode="PG" value="675">
                        파푸아뉴기니 (+675)
                      </option>
                      <option data-countryCode="PY" value="595">
                        파라과이 (+595)
                      </option>
                      <option data-countryCode="PE" value="51">
                        페루 (+51)
                      </option>
                      <option data-countryCode="PH" value="63">
                        필리핀 (+63)
                      </option>
                      <option data-countryCode="PL" value="48">
                        폴란드 (+48)
                      </option>
                      <option data-countryCode="PT" value="351">
                        포르투갈 (+351)
                      </option>
                      <option data-countryCode="PR" value="1787">
                        푸에르토리코 (+1787)
                      </option>
                      <option data-countryCode="QA" value="974">
                        카타르 (+974)
                      </option>
                      <option data-countryCode="RE" value="262">
                        레위니옹 (+262)
                      </option>
                      <option data-countryCode="RO" value="40">
                        루마니아 (+40)
                      </option>
                      <option data-countryCode="RU" value="7">
                        러시아 (+7)
                      </option>
                      <option data-countryCode="RW" value="250">
                        르완다 (+250)
                      </option>
                      <option data-countryCode="SM" value="378">
                        산마리노 (+378)
                      </option>
                      <option data-countryCode="ST" value="239">
                        상투메 프린시페 (+239)
                      </option>
                      <option data-countryCode="SA" value="966">
                        사우디아라비아 (+966)
                      </option>
                      <option data-countryCode="SN" value="221">
                        세네갈 (+221)
                      </option>
                      <option data-countryCode="CS" value="381">
                        세르비아 (+381)
                      </option>
                      <option data-countryCode="SC" value="248">
                        세이셸 (+248)
                      </option>
                      <option data-countryCode="SL" value="232">
                        시에라리온 (+232)
                      </option>
                      <option data-countryCode="SG" value="65">
                        싱가포르 (+65)
                      </option>
                      <option data-countryCode="SK" value="421">
                        슬로바키아 (+421)
                      </option>
                      <option data-countryCode="SI" value="386">
                        슬로베니아 (+386)
                      </option>
                      <option data-countryCode="SB" value="677">
                        솔로몬 제도 (+677)
                      </option>
                      <option data-countryCode="SO" value="252">
                        소말리아 (+252)
                      </option>
                      <option data-countryCode="ZA" value="27">
                        남아프리카 (+27)
                      </option>
                      <option data-countryCode="ES" value="34">
                        스페인 (+34)
                      </option>
                      <option data-countryCode="LK" value="94">
                        스리랑카 (+94)
                      </option>
                      <option data-countryCode="SH" value="290">
                        세인트헬레나 (+290)
                      </option>
                      <option data-countryCode="KN" value="1869">
                        세인트키츠 (+1869)
                      </option>
                      <option data-countryCode="SC" value="1758">
                        세인트루시아 (+1758)
                      </option>
                      <option data-countryCode="SD" value="249">
                        수단 (+249)
                      </option>
                      <option data-countryCode="SR" value="597">
                        수리남 (+597)
                      </option>
                      <option data-countryCode="SZ" value="268">
                        스와질랜드 (+268)
                      </option>
                      <option data-countryCode="SE" value="46">
                        스웨덴 (+46)
                      </option>
                      <option data-countryCode="CH" value="41">
                        스위스 (+41)
                      </option>
                      <option data-countryCode="SI" value="963">
                        시리아 (+963)
                      </option>
                      <option data-countryCode="TW" value="886">
                        대만 (+886)
                      </option>
                      <option data-countryCode="TJ" value="7">
                        타지키스탄 (+7)
                      </option>
                      <option data-countryCode="TH" value="66">
                        태국 (+66)
                      </option>
                      <option data-countryCode="TG" value="228">
                        토고 (+228)
                      </option>
                      <option data-countryCode="TO" value="676">
                        통가 (+676)
                      </option>
                      <option data-countryCode="TT" value="1868">
                        트리니다드 토바고 (+1868)
                      </option>
                      <option data-countryCode="TR" value="90">
                        터키 (+90)
                      </option>
                      <option data-countryCode="TM" value="7">
                        투르크메니스탄 (+7)
                      </option>
                      <option data-countryCode="TM" value="993">
                        투르크메니스탄 (+993)
                      </option>
                      <option data-countryCode="TC" value="1649">
                        터크스 케이커스 제도 (+1649)
                      </option>
                      <option data-countryCode="TV" value="688">
                        투발루 (+688)
                      </option>
                      <option data-countryCode="UG" value="256">
                        우간다 (+256)
                      </option>
                      <option data-countryCode="GB" value="44">
                        영국 (+44)
                      </option>
                      <option data-countryCode="UA" value="380">
                        우크라이나 (+380)
                      </option>
                      <option data-countryCode="AE" value="971">
                        아랍에미리트 (+971)
                      </option>
                      <option data-countryCode="UY" value="598">
                        우루과이 (+598)
                      </option>
                      <option data-countryCode="US" value="1">
                        미국 (+1)
                      </option>
                      <option data-countryCode="UZ" value="7">
                        우즈베키스탄 (+7)
                      </option>
                      <option data-countryCode="VU" value="678">
                        바누아투 (+678)
                      </option>
                      <option data-countryCode="VA" value="379">
                        바티칸 시국 (+379)
                      </option>
                      <option data-countryCode="VE" value="58">
                        베네수엘라 (+58)
                      </option>
                      <option data-countryCode="VN" value="84">
                        베트남 (+84)
                      </option>
                      <option data-countryCode="VG" value="84">
                        영국령 버진 아일랜드 (+1284)
                      </option>
                      <option data-countryCode="VI" value="84">
                        미국령 버진 아일랜드 (+1340)
                      </option>
                      <option data-countryCode="WF" value="681">
                        월리스 퓌투나 (+681)
                      </option>
                      <option data-countryCode="YE" value="969">
                        예멘 (북)(+969)
                      </option>
                      <option data-countryCode="YE" value="967">
                        예멘 (남)(+967)
                      </option>
                      <option data-countryCode="ZM" value="260">
                        잠비아 (+260)
                      </option>
                      <option data-countryCode="ZW" value="263">
                        짐바브웨 (+263)
                      </option>
                    </optgroup>
                  </select>
                  <input
                    type="tel"
                    required
                    id="standard-required"
                    className="phoneNumberInput"
                    label="Required"
                    placeholder="숙박 시설에서 고객님께 연락을 드릴 수 있습니다."
                    variant="standard"
                    value={CAMP_USER_PHONE}
                    onChange={(e) => {
                      setUserPhone(e.target.value);
                    }}
                  />
                </div>
                <p style={{ color: "blue", fontSize: "13px" }}>
                  특별 요청(선택사항){" "}
                  <span>
                    <FaAnglesDown size={"11px"} />
                  </span>
                </p>
              </form>
            </div>
          </div>
          
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="container-box"
          >
            <div className="Reserve-container">
              <form className="customerInfo">
                <div>
                  <h3 style={{ display: "flex", justifyContent: "start" }}>
                    내 예약 관리
                  </h3>
                  <p>확인 이메일</p>
                  <p style={{ fontSize: "13px", marginLeft: "20px" }}>
                    예약하신 일정의 확인 메일을 받을 이메일 주소를 입력해
                    주세요.
                  </p>
                  <br />
                  <p className="input-label">
                    이메일 주소
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    type="email"
                    placeholder="이메일을 입력해주세요.~"
                    className="emailInput"
                    value={CAMP_USER_EMAIL}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                  <br />
                  <input type="checkbox" />{" "}
                  <span style={{ fontSize: "14px" }}>
                    Camply의 마케팅 정보를 이메일로 받아보겠습니다(선택사항).
                  </span>
                </div>
              </form>
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="container-box"
          >
            <div className="Reserve-container">
              <form className="customerInfo">
                <div>
                  <ul style={{ fontSize: "13px" }}>
                    <li> 도착 시 프런트 데스크 직원이 도와드립니다.</li>
                    <li>
                      {" "}
                      Camply및 캠핑장에서는 세금 계산서를 발행하지 않습니다.
                      거래용 상업 영수증이 제공됩니다.{" "}
                    </li>
                    <br />
                  </ul>
                  <hr></hr>
                  <div className="check">
                    <p>
                      체크인:
                      <br />
                      <span>{reserveInfo.CAMP_CHECKIN} 15:00</span>
                    </p>
                    <p>
                      체크아웃:
                      <br />
                      <span>{reserveInfo.CAMP_CHECKOUT} 11:00</span>
                    </p>
                  </div>
                  <hr></hr>

                  <div>
                    <input type="checkbox" onClick={handlemarketing} />{" "}
                    <span style={{ fontSize: "14px" }}>
                      아래의 모두 동의합니다.
                    </span>
                    <br />
                    <input type="checkbox" />
                    <span style={{ fontSize: "14px" }}>
                      본인은 만 18세 이상이며 이용약관, 규정 및 제한 사항 및
                      여행에 대한 정부 권고사항을 읽었고 이에 동의합니다(필수).
                    </span>
                    <br />
                    <input type="checkbox" />
                    <span style={{ fontSize: "14px" }}>
                      개인정보 보호정책에 설명된 대로 개인정보 수정 및 사용에
                      동의합니다(필수).
                    </span>
                    <br />
                    <input type="checkbox" />{" "}
                    <span style={{ fontSize: "14px" }}>
                      개인정보 보호정책에 설명된 대로 국내 또는 해외에서
                      제3자(선택한 여행 공급업체에 포함)에게 개인정보를
                      제공하는데 동의합니다.(필수)
                    </span>
                    <br />
                  </div>
                  <div className="button-btn">
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOrderbtn();
                        }}
                        color="success"
                      >
                        결제하기
                        <FaAngleRight />
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handlebackbtn();
                        }}
                        color="error"
                      >
                        <IoIosArrowBack />
                        취소하기
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampReserve;
