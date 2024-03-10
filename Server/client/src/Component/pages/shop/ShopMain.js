import React from 'react';
import Main from '../shop/Main';
import Search from './Search';
import ButtonUp from './ButtonUp';
import CategoryList from './CategoryList';
import ShopLayout from './ShopLayout';

const ShopMain = () => 
{
  
  
  return (
    
    <div>
  <ShopLayout/>
      <div>
      </div>
      <div style={{paddingTop:'50px'}}>
      </div>
      <div>
      <section className='Search'>
      
        <Search/> 
      </section>
      <section>
      </section>
      </div>
      <div>
        <Main/>
        <CategoryList/>
      </div>
      <ButtonUp/>
    </div>
  );
};

export default ShopMain;