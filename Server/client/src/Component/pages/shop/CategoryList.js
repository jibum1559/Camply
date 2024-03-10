import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../shop/css/ShopMain.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const CategoryList = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [productCategorys] = useState(["tent", "kitchen", "fireplace", "lamp", "sleepingbag", "chair"]);
  const navigate = useNavigate();
  const navigateToCategory = (category) => {
    if(category === "tent"){
      navigate(`/shop/tent`);
    }else if(category === "kitchen"){
      navigate(`/shop/kitchen`);
    }else if(category === "fireplace"){
      navigate(`/shop/fireplace`);
    }else if(category === "lamp"){
      navigate(`/shop/lamp`);
    }else if(category === "sleepingbag"){
      navigate(`/shop/sleeping`);
    }else if(category === "chair"){
      navigate(`/shop/chair`);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await Promise.all(
          productCategorys.map(async (productCategory) => {
            const response = await axios.get(`http://localhost:8080/shop/main/category/${productCategory}`);
            return { category: productCategory, products: response.data };
          })
        );
        const categoryProductMap = {};
        productData.forEach(({ category, products }) => {
          categoryProductMap[category] = products.slice(0, 4);
        });
        setCategoryProducts(categoryProductMap);
      } catch (error) {
        console.error('상품을 불러오는 중 에러 발생', error);
      }
    };
    fetchData();
  }, [productCategorys]);
  const handleSlide = (category, direction) => {
    const updatedProducts = [...categoryProducts[category]];
    const visibleProducts = updatedProducts.slice(0, 10);
    if (direction === 'left') {
      const firstProduct = updatedProducts.shift();
      updatedProducts.push(firstProduct);
    } else {
      const lastProduct = updatedProducts.pop();
      updatedProducts.unshift(lastProduct);
    }
    setCategoryProducts((prev) => ({
      ...prev,
      [category]: updatedProducts,
    }));
  };
  return (
    <div className='category-item'>
      <section>
        <h2>카테고리별 상품목록</h2>
        {Object.keys(categoryProducts).map((category) => (
          <div key={category}>
            <h2 style={{ cursor: 'pointer', marginBottom: '30px', marginTop: '30px' }} onClick={() => navigateToCategory(category)}>
              {category}{<FaAngleRight />}
            </h2>
            <div className='slide-container'>
              <button className='btn-arrow' onClick={() => handleSlide(category, 'left')}>{<FaAngleLeft size={30} />}</button>
              {categoryProducts[category].map((product, index) => (
                <div key={product.productId} className={`slide ${index < 4 ? 'active' : ''} spaced-slide `}>
                  <Link to={`/shop/detail/${product.productId}`}>
                    <div style={{
                      width: '272.5px',
                      height: '272.5px',
                      margin: '0.2em',
                      padding: '0',
                    }} className='imgWrap'>
                      <img src={product.productThumbnail} className='imgs' alt={product.productName} />
                    </div>
                    <div className='textWrap'>
                      <p className='companyName'>{product.productName}</p>
                      <p className='itemName1'>{product.productDescription}</p>
                      <div className='itemsPrice clearfix'>
                        <div className='fr'>
                          <strong className='customerPrice'></strong>
                          <strong className='sellPrice'>{product.formattedProductPrice}</strong>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <button className='btn-arrow' onClick={() => handleSlide(category, 'right')}>{<FaAngleRight size={30} />}</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default CategoryList;