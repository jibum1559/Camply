import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../css/ShopSell/SellerProduct.css";
import Nav from "../../camp/CampNavbar";
import UpdateProduct from "./UpdateProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import ProductList from "../../../img/Seller/상품리스트.png";

const SellerProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 상품 조회 시 0번째에서 1번째로 넘어가기 위한 로딩 변수
  const [selectedProducts, setSelectedProducts] = useState([]); // 선택된 제품을 저장할 상태 변수
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
  const [itemsPerPage, setItemsPerPage] = useState(20); // 페이지당 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageCount, setPageCount] = useState(0);
  const token = localStorage.getItem("yourTokenKey"); // 토큰을 로컬 스토리지에서 가져옴
  const navigate = useNavigate(); // useNavigate 훅 사용

  //등록 상품 리스트 조회
  useEffect(() => {
    if (token) {
      // 토큰이 존재하는 경우에만 요청을 보냅니다.
      axios
        .get("http://localhost:8080/shop/mypage/productList", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          },
        })
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setPageCount(Math.ceil(response.data.length / itemsPerPage));
          setLoading(false);
        })
        .catch((error) => {
          console.error(":", error);
          setLoading(false);
        });
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
    }
  }, [itemsPerPage, token]);

  const handleEditClick = (productId) => {
    navigate(`/shop/seller/edit/${productId}`);
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
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  //상품 삭제하기(드롭다운)
  const handleDeleteClick = async (productId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        if (token) {
          await axios.delete(
            `http://localhost:8080/shop/mypage/productDelete/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProducts(products.filter((p) => p.productId !== productId));
        }
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  // 상품 선택 삭제 처리 함수
  const handleDeleteSelected = async () => {
    // 선택된 상품이 없으면 경고 메시지를 표시하고 함수를 종료합니다.
    if (selectedProducts.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        // 선택된 모든 상품에 대해 삭제 요청을 보냅니다.
        await Promise.all(
          selectedProducts.map((productId) =>
            axios.delete(
              `http://localhost:8080/shop/mypage/productDelete/${productId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );

        // 성공적으로 삭제된 후, 상품 목록에서 선택된 상품들을 제거합니다.
        const newProducts = products.filter(
          (product) => !selectedProducts.includes(product.productId)
        );
        setProducts(newProducts);
        setSelectedProducts([]); // 선택된 상품 목록을 초기화합니다.

        alert("선택한 상품이 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting selected products: ", error);
        alert("상품 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  //등록 상품 리스트에서 handleInputChange 함수를 사용하여 status 선택 가능하도록 하는 함수
  // products 배열을 업데이트하여 특정 상품의 상태를 변경
  const handleInputChange = (productId, newStatus) => {
    setProducts(
      products.map((product) => {
        if (product.productId === productId) {
          // 상태 변경이 감지되면, isChanged 플래그를 설정하고 originalStatus를 기록
          const isChanged = newStatus !== product.originalStatus;
          return {
            ...product,
            productStatus: newStatus,
            isChanged: isChanged,
            // 최초 상태 변경 시, originalStatus를 설정
            originalStatus: product.originalStatus ?? product.productStatus,
          };
        }
        return product;
      })
    );
  };

  // 변경된 상품 상태를 서버에 저장하는 함수
  const handleSaveChanges = async () => {
    try {
      // 변경된 상품만 필터링
      const changedProducts = products.filter((product) => product.isChanged);

      if (changedProducts.length === 0) {
        alert("변경할 내용을 선택해주세요.");
        return;
      }

      // 변경된 모든 상품에 대해 PUT 요청을 전송
      const updatePromises = changedProducts.map((product) =>
        axios.put(
          `http://localhost:8080/shop/mypage/product/statusEdit/${product.productId}`,
          {
            productStatus: product.productStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("yourTokenKey")}`, // 토큰을 헤더에 추가
            },
          }
        )
      );

      // 모든 요청이 성공적으로 처리됐는지 확인
      await Promise.all(updatePromises);

      alert("저장되었습니다.");
      // 성공적으로 변경 사항을 저장한 후에는 모든 상품의 isChanged 플래그와 originalStatus를 리셋
      setProducts(
        products.map((product) => ({
          ...product,
          isChanged: false,
          originalStatus: undefined, // originalStatus 제거
        }))
      );
    } catch (error) {
      console.error("상태 업데이트 중 오류가 발생했습니다:", error);
      alert("변경사항 저장에 실패했습니다.");
    }
  };

  //제품 개별 선택
  const handleCheckboxChange = (productId) => {
    // 체크 박스 변경 시 호출되는 함수
    if (selectedProducts.includes(productId)) {
      // 이미 선택된 항목인 경우 선택 해제
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // 선택되지 않은 항목인 경우 선택
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  //제품 전체 선택
  const handleSelectAllChange = () => {
    if (selectAll) {
      // 전체 선택 해제
      setSelectedProducts([]);
    } else {
      // 전체 선택
      const allProductIds = products.map(
        (ShopProduct) => ShopProduct.productId
      );
      setSelectedProducts(allProductIds);
    }
    setSelectAll(!selectAll); // 전체 선택 상태 반전
  };

  //조회 시 0번째 빈 배열에서 1번째 값으로 넘어가기 위한 로딩
  if (loading) {
    return (
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  console.log(products);

  return (
    <>
      <Nav />

      <div className="sellerProduct">
        <h2>
          &nbsp;&nbsp;
          <img src={ProductList} alt="product" />
          상품리스트{" "}
        </h2>

        <span className="itemsPerPage-position">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="savebutton"
          >
            저장
          </button>
          &nbsp;
          <button
            type="button"
            onClick={handleDeleteSelected}
            className="savebutton"
          >
            삭제
          </button>
          &nbsp;
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
              <th className="checkbox-th-size">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="checkbox-th-position"
                />
              </th>
              <th className="no-th-size">No</th>
              <th className="productname-th-size">상품명</th>
              <th>판매가</th>
              <th>카테고리</th>
              <th>상태</th>
              <th>재고</th>
              <th>등록일</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {currentItems
              .filter(
                (ShopProduct) =>
                  ShopProduct !== null && ShopProduct !== undefined
              )
              .map((ShopProduct, index) => (
                <tr key={ShopProduct.productId || index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(ShopProduct.productId)}
                      onChange={() =>
                        handleCheckboxChange(ShopProduct.productId)
                      }
                      className="checkbox-td-position"
                    />
                  </td>
                  {/* 고유 식별자 product_id는 유지하되 프론트에 보여지기 위한 No 값 */}
                  <td className="no-td-size">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td>
                    <img
                      src={ShopProduct.productThumbnail}
                      alt={`Thumbnail for ${ShopProduct.productName}`}
                      width="60"
                      height="60"
                    />
                    {ShopProduct.productName}
                  </td>
                  <td>{ShopProduct.formattedProductPrice}</td>
                  <td>{ShopProduct.productCategory}</td>
                  <td htmlFor="productStatus">
                    <div className="form-group">
                      <div className="dropdown">
                        <select
                          name="productStatus"
                          onChange={(e) =>
                            handleInputChange(
                              ShopProduct.productId,
                              e.target.value
                            )
                          }
                          value={ShopProduct.productStatus}
                          className="form-control"
                        >
                          <option value="판매중">판매중</option>
                          <option value="판매중지">판매중지</option>
                          <option value="품절">품절</option>
                        </select>
                        <div className="dropdown-icon">&#9660;</div>
                      </div>
                    </div>
                  </td>
                  <td>{ShopProduct.productStock}</td>
                  <td>{ShopProduct.productCreateDate}</td>
                  <td>
                    <NavDropdown title="···" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        onClick={() => handleEditClick(ShopProduct.productId)}
                      >
                        수정
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleDeleteClick(ShopProduct.productId)}
                      >
                        삭제
                      </NavDropdown.Item>
                    </NavDropdown>
                  </td>
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
          activeClassName={"active"}
          forcePage={currentPage - 1} // 현재 페이지를 강제로 설정
        />
      </div>
    </>
  );
};

export default SellerProduct;
/*
.filter() 메서드:

배열 내의 모든 요소에 대해 주어진 함수를 실행하고, 그 결과가 true를 반환하는 모든 요소를 모아 새로운 배열을 만듭니다.
여기서는 ShopProduct가 null 또는 undefined가 아닌 요소만을 걸러내어 새로운 배열을 생성하고 있습니다. 
이는 데이터 목록 중 유효하지 않은 항목을 제외시키기 위함입니다.

key는 React가 리스트의 각 항목을 식별하는 데 사용하는 고유한 값입니다. 
ShopProduct.productId가 유효하다면 그 값을 key로 사용하고, 
그렇지 않다면 (예를 들어, productId가 null 또는 undefined인 경우) 배열의 인덱스(index)를 대신 key 값으로 사용합니다.
*/
