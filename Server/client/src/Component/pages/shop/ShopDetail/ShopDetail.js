import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/ShopDetail/ShopDetail.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Nav from "../../camp/CampNavbar";
import ShopMore from "./ShopMore/ShopMore";
import ShopInquiry from "./ShopInquiry/ShopInquiry";
import ShopReview from "./ShopReview/ShopReview";
import ShopLayout from '../ShopLayout';
import { useRef } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import ShopNav from "../ShopNav";
import ButtonUp from '../ButtonUp';



const ShopDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [like, setLike] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [userType, setUserType] = useState("");
  const [userToken, setUserToken] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const navigate = useNavigate();
  const productRef = useRef(null);
  const reviewRef = useRef(null);
  const inquiryRef = useRef(null);

  // 토큰에서 사용자 ID 추출하는 함수
  const extractUserIdFromToken = () => {
    const token = localStorage.getItem("yourTokenKey");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken.user_id; // 사용자 ID 반환
    }
    return null;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/detail/${productId}`
        );
        setProduct(response.data);
        setUserType(response.data.USER_TYPE)
      } catch (error) {
        console.error("상품 세부 정보를 불러오는 중 오류 발생", error);
      }
    };







    fetchData();
  }, [productId]);



  useEffect(() => {
    setUserToken(localStorage.getItem("yourTokenKey"));
  }, []);

  const handleHeart = () => {
    setLike(!like);
    alert("좋아요");
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      if (!product) {
        console.error("상품 정보가 없습니다.");
        return;
      }
      const userId = extractUserIdFromToken();
      const cartData = {
        productId: parseInt(productId, 10),
        userId: userId,
        productAmount: quantity,
        productThumbnail: product.productThumbnail,
        productName: product.productName,
        productPrice: product.productPrice,
      };

      const response = await axios.post(
        "http://localhost:8080/shop/cart/post",
        cartData
      );
      alert("상품이 장바구니에 추가되었습니다.");
      navigate(`/shop/mycart/${userId}`);
    } catch (error) {
      console.error("상품을 장바구니에 추가하는 중 오류 발생", error);
    }


    if (!isUserLoggedIn) {
      alert('로그인 후 이용이 가능합니다.')
    }
  };

  const handleOrderClick = () => {
    // 선택된 수량을 세션 스토리지에 저장
    sessionStorage.setItem("selectedQuantity", JSON.stringify(quantity));

    if (!isUserLoggedIn) {
      // 로그인하지 않은 경우
      alert('로그인 후 이용이 가능합니다.');
      // 함수 종료
      return;
    }
    // 주문 페이지로 이동
    navigate(`/shop/order/${productId}`, { state: { product, quantity } });
  };





  const isUserLoggedIn = !!userToken;

  return (
    <>
      <Nav />
      <div style={{ marginTop: '100px' }}>
        <ShopNav />
        <div style={{ marginTop: '100px' }} className='main-shopping'>
          <div className='main-section1'>
            <div className='main-section2'>
              <main className='main-section3'>
                {product ? (
                  <>
                    <div className='main-img'>
                      <div className='right-section-img'>
                        <img
                          style={{ width: "378px", height: "400px" }}
                          src={product.productThumbnail}
                          alt='상품 이미지'
                        />
                      </div>
                    </div>
                    <section className='right-section' ref={productRef}>
                      <div className='right-section2'>무료배송</div>
                      <div className='right-section3'>
                        <h1 className='right-section-title'>
                          {product.productName}
                        </h1>
                        <h2 className='right-section-title2'>
                          {product.productDescription}
                        </h2>
                      </div>
                      <span style={{ color: "red" }}>
                        판매가{product.formattedProductPrice}
                      </span>
                      <div className='right-section-login'>
                        {isUserLoggedIn && (
                          <p style={{ display: "none" }}>
                            로그인 후, 적립 혜택이 제공됩니다.
                          </p>
                        )}
                        {!isUserLoggedIn && (
                          <Link to='/login'>
                            <span>로그인 후, 적립 혜택이 제공됩니다.</span>
                          </Link>
                        )}
                      </div>
                      <div>
                        <div className='right-section-img'>
                          <div className='moving-text-container'>
                            <p className='moving-text'>
                              {product.productDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul className='right-section-ul'>
                        <li className='right-section-li'>
                          <dt className='right-section-dt'>배송</dt>
                          <dd className='right-section-dd'>
                            <p className='right-section-dd-p'>무료</p>
                          </dd>
                        </li>

                        <li className='right-section-li'>
                          <dt className='right-section-dt'>판매자</dt>
                          <dd className='right-section-dd'>
                            <p className='right-section-dd-p'>{product.userId}</p>
                          </dd>
                        </li>

                        <li className='right-section-li'>
                          <dt className='right-section-dt'>판매단위</dt>
                          <dd className='right-section-dd'>
                            <p className='right-section-dd-p'>1개</p>
                          </dd>
                        </li>
                        <article className='right-section-article'>
                          <button
                            onClick={handleDecreaseQuantity}
                            className='right-section-article-img'
                          ></button>
                          <div>{quantity}</div>
                          <button
                            onClick={handleIncreaseQuantity}
                            className='right-section-article-img2'
                          ></button>
                        </article>

                        <div className='right-section-footer-div3'>
                          <div className='right-section-footer-div3-div'>
                            <div className='right-section-footer-div3-div-div1'>
                              <span className='right-section-footer-div3-span'>
                                총 상품금액:{" "}
                                {new Intl.NumberFormat("ko-KR", {
                                  style: "currency",
                                  currency: "KRW",
                                }).format(quantity * product.productPrice)}
                              </span>
                            </div>
                            <div className='right-section-footer-div3-div2'>
                              <span className='right-section-footer-div3-div2-span'>
                                적립
                              </span>
                              <span className='right-section-footer-div3-div2-span2'>
                                {isUserLoggedIn && (
                                  <p style={{ display: "none" }}>
                                    로그인 후, 적립 혜택 제공
                                  </p>
                                )}
                                {!isUserLoggedIn && (
                                  <Link to='/login'>
                                    <span>로그인 후, 적립 혜택이 제공됩니다.</span>
                                  </Link>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                      </ul>
                      <div className='right-section-footer'>
                        <button
                          className='right-section-footer-button1'
                          type='button'
                        >
                          <span className='right-section-footer-button-span'>
                            <div className='like' onClick={handleHeart}>
                              {like ? (
                                <AiFillHeart
                                  style={{ color: "#FEA92A", fontSize: "30px" }}
                                />
                              ) : (
                                <AiOutlineHeart style={{ fontSize: "30px" }} />
                              )}
                            </div>
                          </span>
                        </button>
                        <div className='right-section-footer-button-div'>
                          <button
                            className='right-section-footer-button-div-button'
                            type='button'
                          >
                            <span
                              className='right-section-footer-button-span2'
                              onClick={addToCart}
                            >
                              장바구니
                            </span>
                          </button>
                          <button
                            style={{ marginLeft: '20px'}}
                            className="right-section-footer-button-div-button"
                            type="button"
                          
                          >
                            
                              <span
                                className='right-section-footer-button-span2'
                                onClick={handleOrderClick}
                               
                              >
                                결제하기
                              </span>
                          
                          </button>
                        </div>
                      </div>
                    </section>
                  </>
                ) : (
                  <p>상품을 찾을 수 없습니다.</p>
                )}
              </main>
              <nav className='nav-first'>
                <ul className='nav-first-ul'>
                  <li className='nav-first-ul-li'>
                    <ScrollLink
                      to='product'
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      <span style={{ fontSize: '20px' }}>상세정보</span>
                    </ScrollLink>
                  </li>
                  <li className='nav-first-ul-li'>
                    <ScrollLink
                      to='review'
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      <span style={{ fontSize: '20px' }}>리뷰</span>
                    </ScrollLink>
                  </li>
                  <li className='nav-first-ul-li'>
                    <ScrollLink
                      to='inquiry'
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      <span style={{ fontSize: '20px' }}>문의</span>
                    </ScrollLink>
                  </li>
                </ul>
              </nav>
            </div>

            <Element name='product' className='element'>
              <ShopMore />
            </Element>

            <Element name='review' className='element'>
              <ShopReview />
            </Element>

            <Element name='inquiry' className='element'>
              <ShopInquiry />
            </Element>
            <hr></hr>
            <div className='Footer'></div>
          </div>
        </div>
      </div>
      <ButtonUp />
    </>
  );
};

export default ShopDetail;
