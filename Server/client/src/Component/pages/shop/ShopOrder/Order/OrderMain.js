import React, { useState, useEffect } from "react";
import "../../css/ShopOrder/OrderMain.css";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../../camp/CampNavbar";
import OrderImg  from '../../../../img/ShopImg/icons8-구매-주문.gif';

const OrderList = () => {
    const [order, setOrder] = useState([]); // 주문 정보 상태
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

    // 주문 정보 가져오기
    const fetchMyOrder = async () => {
        const userId = extractUserIdFromToken(); // 사용자 ID 추출
        if (userId) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/shop/mypage/general/myorder/view/${userId}`
                );
                setOrder(response.data); // 주문 정보 상태 업데이트
            } catch (error) {
                console.error("주문 정보를 불러오는 중 오류 발생", error);
            }
        } else {
            console.error("사용자 ID를 찾을 수 없습니다.");
        }
    };

    // 주문 삭제
    const handleDeleteMyOrder = async (orderNo) => {
        try {
            await axios.delete(
                `http://localhost:8080/shop/mypage/general/myorder/delete/${orderNo}`
            );
            fetchMyOrder();
            alert("주문이 삭제되었습니다."); // 사용자에게 알림
        } catch (error) {
            console.error("주문을 삭제하는 중 오류 발생", error);
        }
    };

    useEffect(() => {
        fetchMyOrder(); // 컴포넌트 마운트 시 주문 정보 조회
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
                        <h2 className='tit-page'><img src={OrderImg} />주문목록</h2>
                        <div className='page-body'>
                            <div className='table-cart table-fill-prd'>
                                <div className='cart-list'>
                                    <table summary='주문 번호, 이미지, 상품명, 수량, 금액, 조치'>
                                        <colgroup>
                                            <col width={70}></col>
                                            <col width={200}></col>
                                            <col width={20}></col>
                                            <col width={150}></col>
                                            <col width={20}></col>
                                            <col width={30}></col>
                                        </colgroup>
                                        <thead>
                                           
                                            <tr>
                                                <th scope='col'>
                                                    <div className='tb-center'>주문 번호</div>
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
                                                <th scope='col'>
                                                    <div className='tb-center'>조치</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((order, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="tb-center">
                                                            <div className="orderNum">
                                                                {order.orderNo}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='tb-center'>
                                                            <div className='thumb'>
                                                                <img
                                                                    style={{
                                                                        display: "block",
                                                                        width: "200px",
                                                                        height: "200px",
                                                                    }}
                                                                    src={order.productThumbnail}
                                                                    alt='상품 이미지'
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <div className='tb-left'>
                                                            {order.productName}
                                                            <div className='tb-opt'></div>
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <div className='tb-center'>
                                                            {order.orderProductAmount}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='tb-center tb-bold tb-price'>
                                                            <span>{order.totalPrice}</span>원
                                                        </div>
                                                    </td>
                                                    <td className="tb-center">
                                                        <Button

                                                            variant='contained'
                                                            color='secondary'
                                                            onClick={() => handleDeleteMyOrder(order.orderNo)}
                                                        >
                                                            삭제
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div style={{marginBottom:'50px'}} className='basket-totalprice'>
                            <div className='totalprice-img'>지금까지 바친금액</div>
                            <div className='totalprice-text'>
                                <span style={{ color: "#FEA92A" }}>
                                    {order.reduce(
                                        (acc, order) => acc + order.totalPrice * order.orderProductAmount,
                                        0
                                    )}
                                </span>
                                원
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderList;
