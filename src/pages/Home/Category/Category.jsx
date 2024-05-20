import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Category = () => {
    return (
        <div>
          <SectionTitle heading="Order Online" subHeading="from 12 to 12"></SectionTitle>
             <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-72 mb-24"
      >
        <SwiperSlide>
            <img src={slide1} alt="" />
            <h1 className='text-4xl uppercase text-center -mt-44 text-white'>Salad</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide2} alt="" />
            <h1 className='text-4xl uppercase text-center -mt-44 text-white'>Pizza</h1>

            </SwiperSlide>
        <SwiperSlide>
            <img src={slide3} alt="" />
            <h1 className='text-4xl uppercase text-center -mt-44 text-white'>Shoup</h1>
</SwiperSlide>
        <SwiperSlide>
            <img src={slide4} alt="" />
            <h1 className='text-4xl uppercase text-center -mt-44 text-white'>Dessert</h1>
</SwiperSlide>
        <SwiperSlide><img src={slide5} alt="" />            <h1 className='text-4xl uppercase text-center -mt-44 text-white'>Salad</h1>
</SwiperSlide>
        
      </Swiper>
        </div>
    );
};

export default Category;