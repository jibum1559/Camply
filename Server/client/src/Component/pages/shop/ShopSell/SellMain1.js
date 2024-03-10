import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/ShopSell/SellMain1.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const SellMain1 = ()=> {
    return (
        <div>
            <Router>
                <main className='main'>
                    <section className='main-section1'>
                        <h2>판매자
                            <span></span>
                        </h2>
                        <button className='main-section-button'>
                            상품업로드  
                        </button> 
                    </section>
                    <section className='main-section2'>
                        <section className='main-section2-section1'>
                            <Link to="/"><p className='main-section2-productlist'>상품리스트</p></Link>
                            <p className='main-section2-productEdit'>상품수정</p>
                            <p className='main-section2-productOrder'>주문내역</p>
                            <p className='main-section2-productEnquiry'>상품문의</p>
                        </section>
                        <section className='main-section3'>
                       <article className='main-section3-article'>
                        <div>상품명</div>
                        <div>판매가</div>
                        <div>삭제</div>
                        <div>수정</div>
                        </article> 
                        <ul className='main-section3-ul'>
                            <article className='main-section3-ul-article'>
                                <div>
                                    <img src="https://openmarket.weniv.co.kr/media/products/2024/01/18/5bddba7b6574b95d37b6079c199d7101.jpg"/>
                                    <div>
                                        <p className='main-section-ul-article-p'>as</p>
                                        <p className='main-section-ul-article-p2'>
                                            재고 :
                                            1
                                            개
                                        </p>

                                    </div>
                                </div>
                                <div>
                                    2000
                                    원
                                </div>
                                <div></div>
                            </article>
                        </ul>
                    </section>
                    </section>
                    
                </main>
            </Router>
        </div>
    )

}

export default SellMain1;