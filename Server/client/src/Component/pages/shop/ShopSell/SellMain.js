import React from 'react';

import {Routes,Route, Link } from 'react-router-dom';
import '../css/ShopSell/SellMain.css';
import SellAdd from './SellAdd';
import SellEdit from './SellEdit';
import SellEnquiry from './SellEnquiry';
import SellOrder from './SellOrder';






const AddMain = () => {
    


    return (
        
            <div>
                <main className='add-Main'>
                    <div className='my-page' aria-labelledby="my page navigation">
                        <ul>
                            <p style={{ fontSize: '40px' }}>상품관리<br/>
                                <Link to='/add'><span style={{ fontSize: '20px', padding: '8px 0' }}>상품등록</span></Link><br/>
                                <Link to='/'><span style={{ fontSize: '20px', padding: '8px 0' }}>상품리스트</span></Link><br/>
                                <Link to='/order'><span style={{ fontSize: '20px', padding: '8px 0' }}>주문관리</span></Link><br/>
                            </p><br/>
                            <Link to='/enquiry'><p style={{ fontSize: '40px', padding: '8px 0' }}>문의내역</p></Link><br/>
                            
                        </ul>
                    </div>
                    <div className='add-list'>
                        <div className='add-list-2'>
                            <div className='add-list-3'>
                                <Routes>
                                    <Route path='/shop/sell/add' element={<SellAdd/>}/>
                                    <Route path='/shop/sell' element={<SellEdit/>}/>
                                    <Route path='/shop/sell/order' element={<SellOrder/>}/>
                                    <Route path='/shop/sell/enquiry' element={<SellEnquiry/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    );
};

export default AddMain;
