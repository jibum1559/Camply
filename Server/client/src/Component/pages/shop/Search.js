import React, { useState } from 'react';
import axios from 'axios';
import '../shop/css/ShopMain.css';
import Pagination from 'react-js-pagination';

const Search = () => {
  const [productName, setProductName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/shop/main/search/${productName}`);
      setSearchResults(response.data);
      setCurrentPage(1); // 새로운 검색 시 첫 페이지로 리셋
      console.log('검색 결과:', response.data);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  const handleDetailClick = (productId) => {
    window.location.href = `/shop/detail/${productId}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
    <div className='search-container'>
    <div className='search-btn' style={{ display: 'flex', alignItems: 'center'}}>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="검색어를 입력하세요"
        style={{
          padding: '10px',
          borderRadius: '20px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="button"
        onClick={handleSearch}
        style={{
          marginLeft: '10px',
          padding: '10px',
          borderRadius: '20px',
          backgroundColor: '#FEA92A',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        검색
      </button>
    </div> 
    </div>
    <div className='container1'>
    <div className='searchResult'>
      {searchResults.length > 0 && (
        <>
        <div style={{paddingTop:'20px', marginBottom:'50px', textAlign:'center', display:'flex', justifyContent:'flex-end'}}>
        <h2 style={{color:'#FEA92A'}}>{searchResults.length}<span style={{color:'black'}}>개의 상품검색</span></h2>
        </div>
        
        <ul className='swiper-wrapper'>
          <p><b>총{searchResults.length}개</b></p>
          {currentItems.map((product) => (
            
            <li className='swiper-slide swiper-slide-active' style={{
              width: "272.5px",
              marginRight: "30px",
              marginTop:'30px',
            }}>
              
            
              <div className='imgWrap'>
                <img src={product.productThumbnail} className="imgs" alt={product.productName} onClick={() => handleDetailClick(product.productId)} />
              </div>
              <div className="textWrap">
                <p style={{ fontSize: '20px' }} className="companyName"><b>{product.productName}</b></p>
                <p className="itemName1">{product.productDescription}</p>
                <div className="itemsPrice clearfix">
                  <div className="fr">
                    <strong className="sellPrice">{product.formattedProductPrice}</strong>
                  </div>
                </div>
              </div>
            </li>
            
          ))}
        </ul>
        <div style={{ textAlign: 'center' }}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={searchResults.length}
            pageRangeDisplayed={5}
            onChange={paginate}
          />
        </div>
        </>
      )}
      
      {searchResults.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
    </div>
  </>
  
    );
  };

export default Search;