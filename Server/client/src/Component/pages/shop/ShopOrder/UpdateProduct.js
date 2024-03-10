import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../camp/CampNavbar';
import ProductUpdate from '../../../img/Seller/상품수정.png';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import '../css/ShopSell/CreateProduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProduct from './CreateProduct';
import SellerProduct from './SellerProduct';
import OrderProduct from './OrderProduct';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // URL에서 productId를 추출
  const [product, setProduct] = useState(null); // 초기 상태를 null로 설정
  const [originalProduct, setOriginalProduct] = useState(null); // 원본 상품 데이터 상태

  // 토큰을 로컬 스토리지에서 가져옵니다.
  const token = localStorage.getItem('yourTokenKey');

  const [validity, setValidity] = useState({
    productName: true,
    productPrice: true,
    productThumbnail: true,
    productMain: true,
    productContent: true,
    productStock: true,
  });

  //수정할 페이지 불러옴
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error('No productId provided');
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/shop/mypage/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            },
          }
        );
        console.log('Fetched product data:', response.data); // 데이터 로깅

        // 서버로부터 받아온 상품 데이터를 문자열로 변환
        const stringifiedProduct = Object.fromEntries(
          Object.entries(response.data).map(([key, value]) => [
            key,
            String(value),
          ])
        );

        setOriginalProduct(stringifiedProduct); // 원본 데이터 상태 설정
        setProduct(stringifiedProduct); // 수정 가능한 데이터 상태 설정
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId, token]); // 의존성 배열에 productId와 token을 추가하여 해당 값들이 변경될 때마다 함수를 실행

  // 입력 필드의 변경을 처리하는 함수
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    // 유효성 검사
    const isInputValid = value.trim() !== ''; // 공백만 있는 경우를 무효로 처리
    setValidity({ ...validity, [name]: isInputValid });
  };
  const validateForm = () => {
    const fields = [
      'productName',
      'productPrice',
      'productThumbnail',
      'productMain',
      'productContent',
      'productStock',
    ];
    let isFormValid = true;
    const newValidity = { ...validity };

    fields.forEach((field) => {
      if (product[field].trim() === '') {
        newValidity[field] = false;
        isFormValid = false;
      } else {
        newValidity[field] = true;
      }
    });

    setValidity(newValidity);
    return isFormValid;
  };

  //변경사항이 없을 경우 처리하는 함수
  const hasChanges = () => {
    return JSON.stringify(product) !== JSON.stringify(originalProduct);
  };
  // 폼 제출을 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasChanges()) {
      alert('변경된 사항이 없습니다.');
      return; // 변경사항이 없으므로 여기서 함수 실행을 종료
    }

    // 판매가와 재고를 숫자로 변환
    const price = Number(product.productPrice);
    const stock = Number(product.productStock);

    // 1. 판매가와 재고가 음수인지 검사
    if (price < 0 || stock < 0) {
      alert('숫자는 양수만 입력해주시기 바랍니다.');
      return; // 함수 실행을 여기서 중단
    }

    // 2. 판매가 범위 검사 (0 ~ 99999999)
    if (price > 99999999) {
      alert('입력 가능한 숫자를 초과하였습니다.');
      return; // 함수 실행을 여기서 중단
    }

    // 3. 재고 범위 검사 (0 ~ 99999)
    if (stock > 99999) {
      alert('입력 가능한 숫자를 초과하였습니다.');
      return; // 함수 실행을 여기서 중단
    }

    if (!validateForm()) {
      alert('필수 입력사항을 모두 채워주세요.');
      return; // 필수 입력사항이 모두 채워지지 않았으므로 함수 실행 중단
    }

    try {
      await axios.put(
        `http://localhost:8080/shop/mypage/product/edit/${productId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
          },
        }
      );
      alert('상품이 성공적으로 수정되었습니다.');
      navigate('/shop/seller');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('상품 수정에 실패했습니다.');
    }
  };

  //조회 페이지로 되돌아가기
  const handleCancel = () => {
    navigate('/shop/seller');
  };

  if (!product) {
    return (
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <h1 style={{ marginTop: '200px' }}></h1>
      <div className="create-update-Product">
        <h2>
          <img src={ProductUpdate} alt="productupdate" />
          상품수정
        </h2>
        <form onSubmit={handleSubmit}>
          {/* 각 필드를 입력할 수 있는 입력 요소를 생성 */}

          {/* 상품코드 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productCode">상품코드: </label>
            <input
              type="text"
              name="productCode"
              value={product.productCode || ''}
              onChange={handleInputChange}
              readOnly
              className="form-control"
            />
          </div>

          {/* 상품명 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productName">상품명: </label>
            <input
              type="text"
              name="productName"
              value={product.productName || ''}
              onChange={handleInputChange}
              placeholder="필수 입력사항"
              className="form-control"
            />
          </div>

          {/* 상품설명 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productDescription">상품설명: </label>
            <input
              type="text"
              name="productDescription"
              value={product.productDescription || ''}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* 판매가 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productPrice">판매가: </label>
            <input
              type="text"
              name="productPrice"
              value={product.productPrice || ''}
              onChange={handleInputChange}
              placeholder="필수 입력사항"
              className="form-control"
            />
          </div>

          {/* 카테고리 선택 드롭다운 */}
          <div className="form-group">
            <label htmlFor="productCategory">카테고리: </label>
            <div className="dropdown">
              <select
                name="productCategory"
                onChange={handleInputChange}
                value={product.productCategory || ''}
                readOnly
                className="form-control"
              >
                <option value="tent">tent</option>
                <option value="sleepingbag">sleepingbag</option>
                <option value="lamp">lamp</option>
                <option value="fireplace">fireplace</option>
                <option value="chair">chair</option>
                <option value="kitchen">kitchen</option>
              </select>
              <div className="dropdown-icon">&#9660;</div>
            </div>
          </div>
          {/* 색상 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productColor">색상: </label>
            <input
              type="text"
              name="productColor"
              value={product.productColor || ''}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* 썸네일 이미지 URL 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productThumbnail">썸네일 이미지 URL: </label>
            <input
              type="text"
              name="productThumbnail"
              value={product.productThumbnail || ''}
              onChange={handleInputChange}
              placeholder="필수 입력사항"
              className="form-control"
            />
          </div>

          {/* 메인이미지 URL 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productMain">메인이미지 URL: </label>
            <input
              type="text"
              name="productMain"
              value={product.productMain || ''}
              onChange={handleInputChange}
              placeholder="필수 입력사항"
              className="form-control"
            />
          </div>

          {/* 컨텐츠 이미지 URL 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productContent">컨텐츠 이미지 URL: </label>
            <input
              type="text"
              name="productContent"
              value={product.productContent || ''}
              onChange={handleInputChange}
              placeholder="필수 입력사항"
              className="form-control"
            />
          </div>

          {/* 재고 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productStock">재고: </label>
            <input
              type="text"
              name="productStock"
              value={product.productStock || ''}
              onChange={handleInputChange}
              placeholder="필수 입력사항"
              className="form-control"
            />
          </div>

          {/* 등록일 입력 필드 */}
          <div className="form-group">
            <label htmlFor="productCreateDate">상품등록일: </label>
            <input
              type="text"
              name="productCreateDate"
              value={product.productCreateDate || ''}
              readOnly
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* 상품상태 선택 드롭다운 */}
          <div className="form-group">
            <label htmlFor="productStatus">상품상태: </label>
            <div className="dropdown">
              <select
                name="productStatus"
                onChange={handleInputChange}
                value={product.productStatus || ''}
                className="form-control"
              >
                <option value="판매중">판매중</option>
                <option value="판매중지">판매중지</option>
                <option value="품절">품절</option>
              </select>
              <div className="dropdown-icon">&#9660;</div>
            </div>
          </div>
          {/* 버튼 그룹 */}
          <div className="form-group">
            <button type="submit" className="btn">
              저장
            </button>
            &nbsp;
            <button type="button" onClick={handleCancel} className="btn">
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
