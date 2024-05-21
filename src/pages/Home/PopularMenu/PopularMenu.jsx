import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const PopularMenu = () => {
  
    const [menu,setMenu]= useState([])
    const popular = menu.filter(item => item.category ==='popular')
    useEffect(()=>{
        fetch('menu.json')
        .then(res=> res.json())
        .then(datas=>{
            setMenu(datas)
            // setMenu(datas)
        })
    },[])
    return (
        <div className='mb-12'>
    
            <SectionTitle heading="From our menu" subHeading="Popular items"></SectionTitle>
            
            <div className='grid md:grid-cols-2 lg:grid-col-2 gap-6'>
               
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
           <div className='text-center '>
           <button className='btn border-b-indigo-700 border-b-2'>view full menu</button>
           </div>


        </div>
    );
};

export default PopularMenu;