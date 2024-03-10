import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Nav from "../../camp/CampNavbar";
import "../css/ShopSell/OrderProduct.css";
import OrderMangement from "../../../img/Seller/주문관리.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // 상품 조회 시 0번째에서 1번째로 넘어가기 위한 로딩 변수
  const [itemsPerPage, setItemsPerPage] = useState(20); // 페이지당 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageCount, setPageCount] = useState(0);
  const token = localStorage.getItem("yourTokenKey"); // 토큰을 로컬 스토리지에서 가져옵니다.
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchType, setSearchType] = useState("productName"); // 검색 유형 상태 초기화
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);
  // const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품을 저장할 상태 변수
  // const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
  //주문 리스트 조회
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 서버에서 주문 목록을 가져옵니다. 여기서는 판매자 ID가 1이라고 가정
        const response = await axios.get(
          "http://localhost:8080/shop/mypage/orderList",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            },
          }
        );

        // 응답 데이터를 state에 저장
        setOrders(response.data);
        console.log(response.data);

        // 총 주문액과 주문 건수 계산
        const totalAmount = response.data.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        const orderCount = response.data.length;

        setTotalOrderAmount(totalAmount);
        setTotalOrderCount(orderCount);

        setPageCount(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        // 오류가 발생한 경우 콘솔에 오류를 출력
        console.error("주문 목록을 불러오는데 실패했습니다:", error);
      }
    };

    fetchOrders();
  }, [itemsPerPage, token]);

  // 검색 유형 변경 핸들러
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchTerm(""); // 검색 유형이 변경되면 검색어 초기화
  };

  // 검색어 변경 핸들러
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true); // 검색 시작 시 로딩 상태 활성화
    try {
      let response;
      if (
        searchType === "productName" ||
        searchType === "orderOrdererName" ||
        searchType === "orderNo"
      ) {
        // 검색 유형에 따른 URL 매개변수 설정
        response = await axios.get(
          `http://localhost:8080/shop/mypage/search/orders?searchType=${searchType}&searchTerm=${encodeURIComponent(
            searchTerm
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        console.error(response);
      }
      setOrders(response.data); // 검색 결과로 주문 목록 업데이트

      // 검색 결과에 기반한 총 주문 건수와 총 주문액 계산
      const totalAmount = response.data.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );
      const orderCount = response.data.length;

      // 총 주문 건수와 총 주문액 상태 업데이트
      setTotalOrderAmount(totalAmount);
      setTotalOrderCount(orderCount);

      setPageCount(Math.ceil(response.data.length / itemsPerPage)); // 페이지 수 업데이트
    } catch (error) {
      console.error("검색 실패:", error);
    }
    setLoading(false); // 로딩 상태 비활성화
  };

  // 페이지네이션 컨트롤 (예: 페이지 번호 변경)
  const handlePageClick = (data) => {
    let selectedPage = data.selected;
    setCurrentPage(selectedPage + 1);
  };

  // 페이지당 표시할 아이템 수 변경
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // 아이템 수가 변경되면 항상 첫 페이지로 이동
  };

  // 현재 페이지에 표시할 상품 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // //제품 개별 선택
  // const handleCheckboxChange = (productId) => {
  //   // 체크 박스 변경 시 호출되는 함수
  //   if (selectedProducts.includes(productId)) {
  //     // 이미 선택된 항목인 경우 선택 해제
  //     setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  //   } else {
  //     // 선택되지 않은 항목인 경우 선택
  //     setSelectedProducts([...selectedProducts, productId]);
  //   }
  // };

  // //제품 전체 선택
  // const handleSelectAllChange = () => {
  //   if (selectAll) {
  //     // 전체 선택 해제
  //     setSelectedProducts([]);
  //   } else {
  //     // 전체 선택
  //     const allProductIds = orders.map((ShopProduct) => ShopProduct.productId);
  //     setSelectedProducts(allProductIds);
  //   }
  //   setSelectAll(!selectAll); // 전체 선택 상태 반전
  // };

  //조회 시 0번째 빈 배열에서 1번째 값으로 넘어가기 위한 로딩
  if (loading) {
    return (
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  console.log(orders);

  return (
    <>
      <Nav />
      <div className="orderList">
        <h2>
          &nbsp;&nbsp;
          <img src={OrderMangement} alt="ordermanagement" />
          주문관리
        </h2>
        <div className="searchTop">
          <h3>&nbsp;주문내역검색</h3>
          <hr></hr>
        </div>
        <div className="search-bar">
          &nbsp; <label htmlFor="orderSearch">검색조건 </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <select
            name="searchType"
            onChange={handleSearchTypeChange}
            value={searchType}
            class="form-select"
          >
            <option value="productName">상품명</option>
            <option value="orderOrdererName">주문자</option>
            <option value="orderNo">주문번호</option>
          </select>
          <div className="searchInput">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              style={{ width: "330px", height: "38px" }}
              class="form-control"
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            type="button"
            class="btn btn-outline-secondary custom-btn"
          >
            검색
          </button>
        </div>

        {/* 총 주문액과 주문 건수 표시 */}

        <div className="totalOrderInfo">
          <span class="badge text-bg-light custom-badge">총 주문 건수</span>{" "}
          &nbsp;
          <span class="order-text">{totalOrderCount}건</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="badge text-bg-light custom-badge">총 주문액 </span>{" "}
          &nbsp;
          <span class="order-text">
            {totalOrderAmount.toLocaleString("ko-KR")}원
          </span>
        </div>

        <span className="itemsPerPage-position">
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
            <option value={100}>100개씩 보기</option>
          </select>
        </span>
        <table>
          <thead>
            <tr>
              {/* <th className="checkbox-no-th">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th> */}
              <th className="no-th-size">No</th>
              <th>주문일</th>
              <th>주문번호</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>총결제금액</th>
              <th>주문수량</th>
              <th>상품금액</th>
              {/* <th>주문상태</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems
              .filter((order) => order !== null && order !== null)
              .map((order, index) => (
                <tr key={order.orderNo || index}>
                  {/* <td className="checkbox-td">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(order.productId)}
                    onChange={() => handleCheckboxChange(order.productId)}
                  />
                </td> */}
                  {/* 고유 식별자 order_no 유지하되 프론트에 보여지기 위한 No 값 */}
                  <td className="no-td-size">
                    {" "}
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td> {order.orderDate}</td>
                  <td> {order.orderNo}</td>
                  <td> {order.orderOrdererName}</td>
                  <td> {order.productName}</td>
                  <td>
                    {new Intl.NumberFormat("ko-KR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(order.totalPrice)}
                    원
                  </td>
                  <td> {order.orderProductAmount}</td>
                  <td> {order.product?.formattedProductPrice}</td>
                  {/* <td>
                  {order.orderStatus}
                  <NavDropdown title=" " id="basic-nav-dropdown">
                    <NavDropdown.Item
                    // onClick={() => handleDeleteClick(order.productId)}
                    >
                      상품준비중
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    //onClick={() => handleDeleteClick(order.productId)}
                    >
                      배송중
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    // onClick={() => handleDeleteClick(order.productId)}
                    >
                      배송완료
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    //  onClick={() => handleDeleteClick(order.productId)}
                    >
                      취소
                    </NavDropdown.Item>
                  </NavDropdown>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassNam
          e={"active"}
          forcePage={currentPage - 1} // 현재 페이지를 강제로 설정
        />
      </div>
    </>
  );
};

export default OrderProduct;
