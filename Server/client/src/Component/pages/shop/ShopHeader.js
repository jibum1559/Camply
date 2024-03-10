// Header.js

import React from 'react';
import Logo from '../..//img/MainImg/Logo.png';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { IoExit } from 'react-icons/io5';
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <div>
      <div className='main-logo'>
        <section className='logo'>
          <h1>
            <Link to='/shop'>
              <img style={{ width: '170px', height: '170px' }} src={Logo} />
            </Link>
          </h1>
        </section>
        <section className='icon'>
          <Link to='/shop/logout'>
            <IoExit size={40} />
          </Link>
          <Link to='/shop/cart'>
            <FaShoppingCart size={35} />
          </Link>
          <Link to='/shop/mypage'>
            <FaUserAlt size={35} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Header;
