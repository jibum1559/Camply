import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes,Route,Link } from "react-router-dom";
import '../shop/css/ShopMain.css';
import ShopDetail from "./ShopDetail/ShopDetail";
import Pagination from "react-js-pagination";
import img1 from '../../img/icons8-new-48.png';



const Main = () => {
  const [products, setProducts] = useState([]);
  const [productIds] = useState([
    206,
    207,
    208,
    209,
    210,
    211,
    212,
    213,
    214,
    203,
    204,
    205,
  ]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 1부터 시작
  const itemsPerPage = 4;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productData = await Promise.all(
          productIds.slice(startIndex, endIndex).map(async (productId) => {
            const response = await axios.get(`http://localhost:8080/shop/main/view/${productId}`);
            return response.data;
          })
        );
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchData();
  }, [productIds, currentPage]);

  
  return (

      <div className="newItem-section">
        <div className='category-item' style={{ display: 'flex', justifyContent: 'center' }}>
          {products.length > 0 ? (
            <div>
              <h2 style={{ display: 'flex', justifyContent: 'flex-start' }}>신상품</h2>
              <br/>
              {products.map((product) => (
                <section style={{ float: 'left' }} key={product.productId}>
                  <Link to={`/shop/detail/${product.productId}`}>
                    <ul className='swiper-wrapper'>
                      <li className='swiper-slide swiper-slide-active' style={{
                        width: "248px",
                        margin: '0.1em',
                        padding:'0',
                      }}>
                        <div className='imgWrap'>
                          <img src={product.productThumbnail} className="imgs" alt={product.productName} />
                        </div>
                        <div className="textWrap">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '20px' }} className="companyName"><b>{product.productName}</b></p>
                            <img src={img1} alt="New" />
                          </div>
                          <p className="itemName1">{product.productDescription}</p>
                          <div className="itemsPrice clearfix">
                            <div className="fr">
                              <strong className="sellPrice">{product.formattedProductPrice}</strong>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <Routes>
                      <Route path="/shop/detail/:productId" element={<ShopDetail />} />
                    </Routes>
                  </Link>
                </section>
              ))}
            </div>
          ) : (
            <p>상품을 찾을 수 없습니다.</p>
          )}
        </div>
        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={productIds.length}
            pageRangeDisplayed={2}
            onChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      </div>
    );
  };

export default Main;