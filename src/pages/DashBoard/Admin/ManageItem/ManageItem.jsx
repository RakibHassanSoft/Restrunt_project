import React, { useContext } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../../hooks/useMenu'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit, FaUser, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ManageItem = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const [menu,refetch,loading] = useMenu()

    // const handleDelete = async(id) =>{
    //     await Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //       }).then(async(result) => {
    //         if (result.isConfirmed) {

    //             asiosSecure.delete(`/carts/${id}`)
    //             .then(async(res) =>{
    //                 if(res.data.deletedCount > 0){

    //                     await refetch()
    //                     await Swal.fire({
    //                         title: "Deleted!",
    //                         text: "Your file has been deleted.",
    //                         icon: "success"
    //                       });
    //                 }
    //                 else{
    //                     await Swal.fire({
    //                         icon: "error",
    //                         title: "Oops...",
    //                         text: "Something went wrong!",
    //                         footer: '<a href="/dashboard/cart">Why do I have this issue?</a>'
    //                       });

    //                 }
    //             })

    //         }
    //       });
    // }

    const handleUpdateItem = async (itme) => {
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         //   Swal.fire({
        //         //     title: "Deleted!",
        //         //     text: "Your file has been deleted.",
        //         //     icon: "success"
        //         //   });
        //     }
        // });
    }
    const handleDeleteItem = async (item) => {
        // console.log(item._id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/menu/${item._id}`);
                    // console.log(res.data)
                    if (res.data.deletedCount > 0) {
                        refetch();
                       
                        await Swal.fire({
                            title: "Deleted!",
                            text: `${item._id} has been deleted.`,
                            icon: "success",
                            timer:1500
                        });
                    }

                }
            }
            );
    }
    return (
        <div>
            <SectionTitle heading={'Manage all items'} subHeading={'hurry up'}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>item name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((item, index) =>
                                    <tr key={item._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}

                                        </td>
                                        <td>$ {item.price}</td>
                                        <td>
                                            {user.role == 'admin' ? "admin" : <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button onClick={() => handleUpdateItem(item)} className="btn bg-orange-300">
                                                <FaEdit
                                                    className='text-white text-xl' />
                                            </button>
                                            
                                            </Link>
                                            }

                                        </td>
                                        <th>
                                            {user.role == 'admin' ? "admin" : <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost   text-3xl"><RiDeleteBin6Line className='text-red-600' />
                                            </button>
                                            }

                                        </th>
                                    </tr>
                                )
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;