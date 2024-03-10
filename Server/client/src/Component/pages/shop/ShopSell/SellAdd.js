import React, { useState } from 'react';
import axios from 'axios';
import '../css/ShopSell/SellAdd.css';



const SellAdd = () => {
    const [products, setProducts] = useState({
        productCategory: '',
        productName: '',
        productPrice: '',
        productDescription: '',
        productStock: '',
        productThumbnail: null,
        productMain: null,
        productMain2: null,
        productMain3: null,
        productContent: null,
    });

    const handleChange = (e) => {
        const { name, type } = e.target;

        // 파일 업로드 처리
        const newValue = type === 'file' ? e.target.files : e.target.value

        setProducts((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 파일을 FormData로 감싸서 서버에 전송
        const formData = new FormData();
        for (const key in products) {
            formData.append(key, products[key]);
        }

        try {
            // 서버로 데이터 전송
            const response = await axios.post('http://localhost:8080/api/products', formData);

            console.log('상품 등록 성공', response.data);
            
        } catch (error) {
            console.error('상품 등록 실패', error);

        }
    };

    return (
        <div className="sell-add-form-container">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit}>
                <p>카테고리:</p>
                <div>
                    <select name="productCategory" value={products.productCategory} onChange={handleChange}>
                        <option value="0">카테고리 선택</option>
                        <option value="텐트">텐트</option>
                        <option value="침낭">침낭</option>
                        <option value="램프">램프</option>
                        <option value="화로">화로</option>
                        <option value="의자">의자</option>
                        <option value="키친">키친</option>
                    </select>
                </div>

                <label>
                    상품명:
                    <input type="text" name="productName" value={products.productName} onChange={handleChange} />
                </label>

                <label>
                    가격:
                    <input type="text" name="productPrice" value={products.productPrice}  onChange={handleChange} />
                </label>

                <label>
                    상품내용:
                    <textarea name="productDescription" value={products.productDescription}  onChange={handleChange} />
                </label>

                <label>
                    상품재고:
                    <input type="number" name="productStock" value={products.productStock}  onChange={handleChange} />
                </label>
                <label>
                    상품썸네일:
                    <input type="file" name="productThumbnail"  onChange={handleChange} />
                </label>

                <label>
                    상품이미지1:
                    <input type="file" name="productMain" onChange={handleChange} />
                </label>

                <label>
                    상품이미지2:
                    <input type="file" name="productMain2"  onChange={handleChange} />
                </label>

                <label>
                    상품이미지3:
                    <input type="file" name="productMain3"  onChange={handleChange} />
                </label>
                <label>
                    상품상세내용:
                    <input type="file" name="productContent"  onChange={handleChange} />
                </label>

                <button type="submit">등록하기</button>
            </form>
        </div>
    );
};

export default SellAdd;
