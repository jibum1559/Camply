import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ShopSell/CreateProduct.css';
import Nav from '../../camp/CampNavbar';
import ProductAdd from '../../../img/Seller/상품등록.png';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

const initialProductState = {
  productName: '',
  productDescription: '',
  productPrice: '',
  productCategory: 'tent',
  productColor: '',
  productThumbnail: '',
  productMain: '',
  productMain2: '',
  productMain3: '',
  productContent: '',
  productStock: '',
  productCreateDate: new Date().toISOString().split('T')[0], // 오늘 날짜로 기본 설정
  productStatus: '판매중',
  productCode: '',
};

const CreateProduct = () => {
  const [product, setProduct] = useState({ ...initialProductState });
  const [validity, setValidity] = useState({
    productName: true,
    productPrice: true,
    productThumbnail: true,
    productMain: true,
    productContent: true,
    productStock: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트 마운트 시 상품 코드 생성 로직을 실행
    generateProductCode();
  }, [product.productCategory]); // 카테고리가 변경될 때마다 상품 코드를 재생성

  const generateProductCode = async () => {
    // localStorage에서 사용자 ID를 가져옴
    const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옴
    const token = localStorage.getItem('yourTokenKey');

    if (!token || !userId) {
      console.error('Token or UserID is not available');
      return;
    }

    try {
      // 백엔드에서 사용자별 상품 등록 수를 조회하는 요청
      const response = await axios.get(
        'http://localhost:8080/shop/mypage/getUserProductCount',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const productCount = response.data + 1; // 다음 등록될 상품의 순번

      const categoryCode = product.productCategory
        .substring(0, 3)
        .toUpperCase();
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '');

      // 상품 코드 설정
      const newProductCode = `${categoryCode}${date}${userId}${String(
        productCount
      ).padStart(5, '0')}`;
      setProduct((prevProduct) => ({
        ...prevProduct,
        productCode: newProductCode,
      }));
    } catch (error) {
      console.error('Error generating product code:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input Changed:', name, value); // 로깅 추가
    // 입력값 변경
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

  //상품등록
  const handleRegister = async () => {
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
      // Spring Boot 애플리케이션의 API 엔드포인트에 데이터 전송
      const response = await axios.post(
        'http://localhost:8080/shop/mypage/productAdd',
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('yourTokenKey')}`,
          },
        }
      );
      console.log(response.data);
      alert('상품이 성공적으로 등록되었습니다.');
      navigate('/shop/seller');
    } catch (error) {
      console.error('Error registering product:', error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Nav />

      <div className="create-update-Product">
        <h2>
          <img src={ProductAdd} alt="productadd" />
          상품등록
        </h2>

        <div className="form-group">
          <label htmlFor="productCode">상품코드 </label>
          <input
            type="text"
            name="productCode"
            onChange={handleInputChange}
            value={product.productCode}
            readOnly
            placeholder="등록 시 자동생성"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productName">상품명 </label>
          <input
            type="text"
            name="productName"
            onChange={handleInputChange}
            value={product.productName}
            placeholder="필수 입력사항"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">상품설명 </label>
          <input
            type="text"
            name="productDescription"
            onChange={handleInputChange}
            value={product.productDescription}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">판매가 </label>
          <input
            type="text"
            name="productPrice"
            onChange={handleInputChange}
            value={product.productPrice}
            placeholder="필수 입력사항"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory">카테고리</label>
          <div className="dropdown">
            <select
              name="productCategory"
              onChange={handleInputChange}
              value={product.productCategory}
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

        <div className="form-group">
          <label htmlFor="productColor">색상 </label>
          <input
            type="text"
            name="productColor"
            onChange={handleInputChange}
            value={product.productColor}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productThumbnail">썸네일 이미지(url) </label>
          <input
            type="text"
            name="productThumbnail"
            onChange={handleInputChange}
            value={product.productThumbnail}
            placeholder="필수 입력사항"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productMain">메인이미지(url) </label>
          <input
            type="text"
            name="productMain"
            onChange={handleInputChange}
            value={product.productMain}
            placeholder="필수 입력사항"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productContent">컨텐츠 이미지(url)</label>
          <input
            type="text"
            name="productContent"
            onChange={handleInputChange}
            value={product.productContent}
            placeholder="필수 입력사항"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productStock">재고 </label>
          <input
            type="text"
            name="productStock"
            onChange={handleInputChange}
            value={product.productStock}
            className="form-control"
            placeholder="필수 입력사항"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCreateDate">상품등록일 </label>
          <input
            type="text"
            name="productCreateDate"
            onChange={handleInputChange}
            value={product.productCreateDate}
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productStatus">상품상태 </label>
          <div className="dropdown">
            <select
              name="productStatus"
              onChange={handleInputChange}
              value={product.productStatus}
              className="form-control"
            >
              <option value="판매중">판매중</option>
              <option value="판매중지">판매중지</option>
              <option value="판매종료">품절</option>
            </select>
            <div className="dropdown-icon">&#9660;</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" onClick={handleRegister}>
            등 록
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
