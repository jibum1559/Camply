import React from 'react';
import img1 from '../../img/DetailImg/1.jpg';
import img2 from '../../img/DetailImg/2.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




const DetailCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,

    };

    return(
        <div className='detail-carousel' style={{ textAlign: 'center' }}>
            <Slider {...settings}>
                <div>
                    <img
                    src={img1}
                    alt='Slide 1'
                    style={{width:'20%', height:'auto',maxHeight: '200px',margin: '0 auto'}}
                    />
                </div>
                <div>
                    <img
                    src={img2}
                    alt='Slide 2'
                    style={{width:'20%', height:'auto',maxHeight: '200px',margin: '0 auto'}}
                    />
                </div>
            </Slider>
        </div>
    )

}

export default DetailCarousel;