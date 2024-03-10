import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/ShopCart/ShopCart.css";
import { Button } from "@mui/material";
import Nav from "../../camp/CampNavbar";
import CartImg from '../../../img/ShopImg/icons8-쇼핑-카트.gif'

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const navigate = useNavigate();
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
  const handleCheckoutSelected = () => {
    const selectedItem = cartItems.find(
      (item) => item.cartId === selectedCartId
    );
    if (!selectedItem) {
      alert("결제할 항목을 선택해주세요.");
      return;
    }
    navigate(`/shop/order/${selectedItem.productId}`, {
      state: { product: selectedItem, quantity: selectedItem.productAmount },
    });
  };
  const handleRemoveSelected = async () => {
    if (!selectedCartId) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8080/shop/cart/delete/${selectedCartId}`
      );
      setCartItems(cartItems.filter((item) => item.cartId !== selectedCartId));
      setSelectedCartId(null); // 선택 상태 초기화
    } catch (error) {
      console.error("장바구니 항목을 삭제하는 중 오류 발생", error);
    }
  };
  const handleSelectChange = (cartId) => {
    setSelectedCartId(cartId);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  //뒤로 가기
  const backtodetail = () => {
    navigate('/shop/main'); // 뒤로 가기
  };
  // 장바구니 정보 가져오기
  const fetchCartItems = async () => {
    const userId = extractUserIdFromToken();
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/cart/mycart/${userId}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("장바구니 정보를 불러오는 중 오류 발생", error);
      }
    } else {
      console.error("사용자 ID를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Nav />
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "900px" }} id='content'>
          <div id='cartWrap'>
            <h2 className='tit-page'><img src={CartImg}/>장바구니</h2>
            <button className="order-btn" onClick={handleRemoveSelected}>선택 항목 삭제</button>
            <div className='page-body'>
              <div className='table-cart table-fill-prd'>
                <div className='cart-list'>
                  <table summary='선택,사진, 제품명, 수량, 가격, 취소'>
                    <colgroup>
                      <col width={20}></col>
                      <col width={80}></col>
                      <col width={20}></col>
                      <col width={150}></col>
                      <col width={20}></col>
                      <col width={20}></col>
                      <col width={50}></col>
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope='col'>
                          <div className='tb-center'>선택</div>
                        </th>
                        <th scope='col'>
                          <div className='tb-center'>사진</div>
                        </th>
                        <th scope='col'></th>
                        <th scope='col'>
                          <div className='tb-center'>상품명</div>
                        </th>
                        
                        <th scope='col'></th>
                        <th scope='col'>
                          <div className='tb-center'>수량</div>
                        </th>
                        <th scope='col'>
                          <div className='tb-center'>금액</div>
                        </th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <td colSpan={7}>
                          <div className='total-prices tb-right'>
                            <div className='prov-icons'>
                              <p className='ico ico1'>본사배송</p>
                            </div>
                            총 구매금액 :{" "}
                            {cartItems.reduce(
                              (acc, item) =>
                                acc + item.productPrice * item.productAmount,
                              0
                            )}
                            원 =
                            <strong style={{ color: "red" }}>
                              {cartItems.reduce(
                                (acc, item) =>
                                  acc + item.productPrice * item.productAmount,
                                0
                              )}
                              원
                            </strong>
                            (적립금 0원)
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.cartId}>
                          <td>
                            <div className="tb-center">
                              <input
                                
                                type='radio'
                                name='selectCartItem'
                                checked={selectedCartId === item.cartId}
                                onChange={() => handleSelectChange(item.cartId)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className='tb-center'>
                              <div className='thumb'>
                                <img
                                  style={{
                                    display: "block",
                                    width: "194.59px",
                                    height: "181px",
                                  }}
                                  src={item.productThumbnail}
                                  alt='상품 이미지'
                                />
                              </div>
                            </div>
                          </td>
                          <td></td>
                          <td>
                            <div className='tb-left'>
                              {item.productName}
                              <div className='tb-opt'></div>
                            </div>
                          </td>
                          <td></td>
                          <td>
                            <div className='tb-center'>
                              {item.productAmount}
                            </div>
                          </td>
                          <td>
                            <div className='tb-center tb-bold tb-price'>
                              <span>{item.productPrice}</span>원
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='basket-totalprice'>
              <div className='totalprice-img'>총 결제금액</div>
              <div className='totalprice-text'>
                <span style={{ color: "#FEA92A" }}>
                  {cartItems.reduce(
                    (acc, item) => acc + item.productPrice * item.productAmount,
                    0
                  )}
                </span>
                원
              </div>
            </div>

            <div className='btn-order-ctrl'>
              <button
                className='order-btn'
                type='submit'
                onClick={() => handleCheckoutSelected(cartItems[0])}
              >
                결제하기
              </button>

              <button className='back-btn' onClick={backtodetail}>
                계속 쇼핑하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
