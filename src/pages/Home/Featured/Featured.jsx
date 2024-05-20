import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImage from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle heading={"Featured item"} subHeading={"Check it out"}></SectionTitle>
            <div className='md:flex justify-center items-center py-20 px-36 bg-slate-500 bg-opacity-40'>
                <div>
                    <img src={featuredImage} alt="" />
                
                </div>
                <div className="md:ml-10 ">
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'> Where can I get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eligendi quisquam quis repellat illum? Culpa tempore necessitatibus provident ullam tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, minus.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order now</button>
                </div>
            </div>
            
        </div>
    );
};

export default Featured;