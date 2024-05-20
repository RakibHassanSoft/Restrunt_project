import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiDoubleQuotesL } from "react-icons/ri";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Testimonials = () => {


    const [reviews,setReviews]= useState([]);
    useEffect(()=>{
        fetch('reviews.json')
        .then(res => res.json())
        .then(datas =>{
            setReviews(datas)
        })
    },[])

    return (
        <section className='my-20'>
           
            <SectionTitle subHeading={"What our calient say"} heading={"testimonials"}></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              

           {
            reviews.map(revies=>   <SwiperSlide key={revies._id}>
                 
                <div className=' flex flex-col items-center my-16  mx-24'>
                <Rating style={{ maxWidth: 250 }} value={revies.rating}></Rating>
                    <RiDoubleQuotesL  />
                    <p className='py-6'>{revies.details}</p>
                    <h3 className="text-2xl text-orange-400">{revies.name}</h3>
                </div>
                
                </SwiperSlide>)
           }
      </Swiper>

        </section>
    );
};

export default Testimonials;