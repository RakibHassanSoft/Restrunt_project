import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLoaderData, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default AdminRoute;