import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymnetHistry = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: paymnets=[]} = useQuery({
        queryKey:['payments',user.email],
        queryFn: async()=>{
            const res = await  axiosSecure.get(`/payments/${user.email}`)
        //   console.log(res.data)
            return res.data;

        }
    })
    return (
        <div>
           <h2 className='text-3xl text-center mt-4 mb-4'> Real payment history</h2>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>Total Item</th>
        <th>Total Price</th>
        <th>Payment Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        paymnets.map((payment,index)=> 
            <tr key={payment._id}>
        <th>{index+1}</th>
        <td>{payment.email}</td>
        <td>{payment.menuItemIds?.length}</td>
        <td>{payment.price}</td>
        <td>{payment.date}</td>
        <td>{payment.status}</td>
      </tr>
        )
      }

    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymnetHistry;