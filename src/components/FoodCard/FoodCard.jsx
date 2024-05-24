import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';




const FoodCard = ({item}) => {
    const {image,price,recipe,name,_id,category} = item
    // console.log(item)
    //Geting user from custom hook
    const {user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [,refetch]= useCart()
    const handleAddToCart = async(food) =>{
        if(user && user?.email){
            //send cart item to the database
            const cartItem ={
                menuId :_id,
                email: user.email,
                name,
                image,
                price,
                category

            }
            axiosSecure.post('/carts',cartItem)
            .then(async(res) =>{
                console.log(res.data)
                await Swal.fire({
                    title: "Congratulation!",
                    text: ` added ${name} successfully done!`,
                    icon: "success",
                    timer: 5000
                  });

                  //refetch the cary to update the cart item count
                  refetch()

            })
            
            // axios.post('http://localhost:5000/carts',cartItem)
            // .then(async(res) =>{
            //     console.log(res.data)
            //     await Swal.fire({
            //         title: "Congratulation!",
            //         text: ` added ${name} successfully done!`,
            //         icon: "success",
            //         timer: 5000
            //       });

            // })
            
          
        }else{
            await Swal.fire({
                title: "Failed",
                text: "No user found",
                icon: "error",
               
              });
              navigate('/login' ,{state:{from :location}})
        }
        // console.log(food,user.email)
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <h1 className='bg-slate-900 text-white absolute 
            right-0 mr-4 mt-4 px-4'>${price}</h1>
            <div className="card-body text-center">
                <h2 className="text-4xl font-bold text-center">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                <button
                onClick={()=>handleAddToCart(item)} 
                className="btn btn-outline bg-slate-100 border-0  border-b-4 mt-4 border-orange-400 text-orange-500">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;