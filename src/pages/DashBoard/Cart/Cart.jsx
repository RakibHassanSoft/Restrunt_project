import React from 'react';
import useCart from '../../../hooks/useCart';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const Cart = () => {
    const [cart,refetch] = useCart()
    // console.log(cart)
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(totalPrice)
    const asiosSecure = useAxiosSecure()
    // console.log(asiosSecure)
    const handleDelete = async(id) =>{
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
               
                asiosSecure.delete(`/carts/${id}`)
                .then(async(res) =>{
                    if(res.data.deletedCount > 0){
                        
                        await refetch()
                        await Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                    else{
                        await Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            footer: '<a href="/dashboard/cart">Why do I have this issue?</a>'
                          });

                    }
                })
              
            }
          });
    }
    return (
        <div className='mt-28 '>
            <SectionTitle
                subHeading={"Your cart"}
                heading={"Your item details"}>
            </SectionTitle>
            <div className='flex justify-between'>
                <h2 className='text-2xl'>Total items : {cart.length}</h2>
                <h2 className='text-2xl'>Total Price : {totalPrice}</h2>
                <button className='btn btn-primary'>Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead >
                        <tr>
                            <th className='text-center'>#</th>
                            <th>Image</th>
                            <th >Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* row 1 */}
                        {
                            cart.map((item, index) =>

                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td >
                                        <div className="flex items-center ">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-left">{item.name}</div>
                                    </td>
                                    <td>$ {item.price}</td>
                                    <th>
                                        <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-lg"><RiDeleteBin6Line className='text-red-600' />
                                        </button>
                                    </th>
                                </tr>
                            )
                        }


                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default Cart;