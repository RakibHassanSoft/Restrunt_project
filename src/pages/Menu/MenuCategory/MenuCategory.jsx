import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import {Link} from 'react-router-dom';
const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className='pt-10'>
            {title && <Cover title={title} img={coverImg}></Cover>}
            <div className='grid md:grid-cols-2 lg:grid-col-2 gap-6 mt-20'>

                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
           
            <Link  to={`/order/${title}`} className="btn btn-outline border-0 border-b-4 mt-4">Order now</Link>
        </div>
    );
};

export default MenuCategory;