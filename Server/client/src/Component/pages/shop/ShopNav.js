import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../camp/CampNavbar';
import img1 from '../../img/ShopImg/icons8-텐트-48.png';
import img2 from '../../img/ShopImg/icons8-침낭-64.png';
import img3 from '../../img/ShopImg/icons8-램프-48.png';
import img4 from '../../img/ShopImg/icons8-모닥불-64.png';
import img5 from '../../img/ShopImg/icons8-의자-48.png';
import img6 from '../../img/ShopImg/icons8-식기-64.png';



function ShopNav( ) {
  return (
   
      <div>
        <Nav/>
        <div style={{marginTop:'50px'}} className='main-category'>
          <div className='contentsWrap'>
            <ul className='clearfix'>
              <li className='f1'>
                <Link to="/shop/tent">
                  <img src={img1} style={{width:'64px',height:'64px'}} alt="텐트 아이콘" />
                  <span>텐트</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/sleeping" rel="noopener noreferrer">
                  <img style={{width:'64px',height:'64px'}} src={img2} alt="침낭 아이콘" />
                  <span>침낭</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/lamp">
                  <img src={img3} style={{width:'64px',height:'64px'}} alt="램프 아이콘" />
                  <span>램프</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/fireplace">
                  <img src={img4} style={{width:'64px',height:'64px'}} alt="화로 아이콘" />
                  <span>화로BBQ</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/chair">
                  <img src={img5} style={{width:'64px',height:'64px'}} alt="의자 아이콘" />
                  <span>의자</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/kitchen">
                  <img src={img6} style={{width:'64px',height:'64px'}} alt="키친 아이콘" />
                  <span>키친</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default ShopNav;
