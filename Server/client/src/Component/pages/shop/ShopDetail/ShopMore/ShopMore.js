import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ShopMore = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/shop/detail/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div style={{textAlign:'center'}} >
      <h2 >상품 상세정보</h2>
      <container>
        <div> 
          {product ? (
            <>
            <img src={product.productContent}/>        
            
            </> 
          ):(
            <p>이미지를 찾을 수 없습니다.</p>
            )} 
        </div>  
        
      </container>      
     
    </div>
  );
};

export default ShopMore;
