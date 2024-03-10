import React from 'react';
import ShopNav from './ShopNav';
import Nav from '../camp/CampNavbar';
import Carousel from '../../Carousel/MainPageCarousel';
import ButtonUp from './ButtonUp';


function ShopLayout({ children }) {
    return(
        <div style={{paddingTop:'150px'}}>
            <Carousel/>
            <Nav/>
            <ShopNav/>
            {children}
            <ButtonUp/>
          
        </div>
    )
}

export default ShopLayout;