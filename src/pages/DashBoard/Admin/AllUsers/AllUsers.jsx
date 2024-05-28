import { useQueries } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
  
    useQuery,
} from '@tanstack/react-query'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaUser, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users' );

            
            // const res = await axiosSecure.get('/users',{
            //     headers:{
            //         authorization :`Bearar ${localStorage.getItem('access-token')}`
            //     }}
            // );
            return res.data;
        }
    });
    const handleMakeAdmin =async(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(async(res)=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                await refetch()
                await Swal.fire({
                    title: "Admin making ",
                    text: "Admin making successfully done",
                    icon: "success"
                });
            }else{
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                   
                });

            }
        })
    }
    
    const handleDeleteUser = async (user) => {
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
           
                axiosSecure.delete(`/users/${user?._id}`)
                    .then(async (res) => {
                        if (res.data.deletedCount > 0) {

                          await refetch()
                            await Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        else {
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
    //   console.log(users)
    return (
        <div>
            <h2>All users</h2>
            <div className='flex justify-evenly my-4'>
                <h2 className="text-3xl">All users </h2>
                <h2 className="text-3xl">Total users{users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>name</th>
                            <th>Eamil</th>
                            <th className=''>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map(((user, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                      { user.role == 'admin'? "admin":<button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-300">
                                            <FaUsers className='text-white text-2xl' />
                                        </button>
                                        }

                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg">
                                            <RiDeleteBin6Line className='text-white text-3xl bg-red-500' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;