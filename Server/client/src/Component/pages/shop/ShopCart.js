import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../camp/CampNavbar';

const ShopCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const response = await axios.get(`http://localhost:8080/shop/cart/${productId}`);
          setProducts(response.data);
        } else {
          console.error('productId가 없습니다.');
        }
      } catch (error) {
        console.error('장바구니 목록을 불러오는데 실패했습니다.', error);
      }
    };

    fetchData();
  }, [productId]);

  const addToCart = async (cartAmount, currentProductId, currentCartPrice) => {
    try {
      if (currentProductId) {
        const totalPrice = cartAmount * currentCartPrice;
  
        await axios.post(`http://localhost:8080/shop/cart/post`, {
          productId: currentProductId,
          cartAmount: cartAmount,
          totalPrice: totalPrice,
        });
  
        alert('상품이 장바구니에 저장되었습니다.');
        navigate(`/shop/cart`);
      } else {
        console.error('productId가 없어 상품을 추가할 수 없습니다.');
      }
    } catch (error) {
      console.error('상품을 장바구니에 추가하는 중 실패', error);
    }
  };

  const renderProducts = () => {
    return (
      <div>
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <div key={product.productId}>
                <ul>
                  <li>
                    <img style={{ width: '378px', height: '400px' }} src={product.cartImg} alt={product.cartName} />
                  </li>
                  <li>
                    <p>수량: {product.cartAmount}</p>
                    <input
                      type="number"
                      value={product.cartAmount}
                      onChange={(e) => setProducts((prevProducts) => {
                        const updatedProducts = prevProducts.map((p) =>
                          p.productId === product.productId ? { ...p, cartAmount: e.target.value } : p
                        );
                        return updatedProducts;
                      })}
                    />
                  </li>
                  <li>
                    <p>가격{product.cartPrice})</p>
                  </li>
                  <button onClick={() => addToCart(product.cartAmount, product.productId, product.cartPrice)}>장바구니에 추가</button>
                </ul>
              </div>
            ))}
          </>
        ) : (
          <p>장바구니에 상품이 없습니다.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <hr />
      <Nav />
      {renderProducts()}
    </>
  );
};

export default ShopCart;