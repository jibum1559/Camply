import React from 'react';
import img1 from '../img/MainImg/camping-7947056_1280.jpg';
import img2 from '../img/MainImg/camping-7856198_1280.jpg';
import img3 from '../img/MainImg/fire-8230528_1920.jpg';
import img4 from '../img/MainImg/campfire-896196_1280.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainPageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className='main-carousel' style={{ textAlign: 'center'}}>
      <Slider {...settings}>
          <div>
            <img
              src={img1}
              alt='Slide 1'
              style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto', boxShadow:'5px 5px 1px 1px #FEA92A', borderRadius:'10px'}}
            />
          </div>
          <div >
            <img
              src={img2}
              alt='Slide 2'
              style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto', boxShadow:'5px 5px 1px 1px #FEA92A', borderRadius:'10px' }}
            />
          </div>
          <div>
            <img
              src={img3}
              alt='Slide 3'
              style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto', boxShadow:'5px 5px 1px 1px #FEA92A', borderRadius:'10px' }}
            />
          </div>
          <div>
            <img
              src={img4}
              alt='Slide 1'
              style={{ width: '70%', height: 'auto', maxHeight: '600px', margin: '0 auto', boxShadow:'5px 5px 1px 1px #FEA92A', borderRadius:'10px' }}
            />
          </div>  
      </Slider>
    </div>
  );
};

export default MainPageCarousel;
