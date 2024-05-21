
import FoodCard from '../../../components/FoodCard/FoodCard';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

const OrderTab = ({items}) => {
    return (
        <div >
         <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 '>

            {
                 items.map((item)=><FoodCard item={item}></FoodCard>)
            }
            </div>

        </SwiperSlide>
        
      </Swiper>
        {/* {
            items.map((item)=><FoodCard item={item}></FoodCard>)
        } */}
        </div>
    );
};

export default OrderTab;