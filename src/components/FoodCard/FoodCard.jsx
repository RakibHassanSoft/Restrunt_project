import React from 'react';

const FoodCard = ({item}) => {
    const {image,price,recipe,name} = item
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <h1 className='bg-slate-900 text-white absolute 
            right-0 mr-4 mt-4 px-4'>${price}</h1>
            <div className="card-body text-center">
                <h2 className="text-4xl font-bold text-center">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-outline bg-slate-100 border-0  border-b-4 mt-4 border-orange-400 text-orange-500">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;