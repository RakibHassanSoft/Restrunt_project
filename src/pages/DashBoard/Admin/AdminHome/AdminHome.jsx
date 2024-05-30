import React from 'react';
import useAuth from '../../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUser, FaUsers } from 'react-icons/fa';
const AdminHome = () => {
    const { user } = useAuth()
    // console.log(user)
    const axiosSecure = useAxiosSecure()
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi ,Wellcome </span>
                {
                    user?.dispalyName ? user.displayName : "Back"
                }
            </h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value flex"><FaDollarSign></FaDollarSign>{stats.revenue}</div>
                    
                </div>

                <div className="stat">
                    <div className="stat-title">Users</div>
                    <div className="stat-value flex"><FaUsers className=''></FaUsers>{stats.users}</div>
                   
                </div>

                <div className="stat">
                    <div className="stat-title"> Menu Items</div>
                    <div className="stat-value flex"><FaBook></FaBook>${stats.menuItems}</div>
                   
                </div>
                <div className="stat">
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                  
                </div>

            </div>
        </div>
    );
};

export default AdminHome;