import React, { useContext } from 'react';

import { Navigate, useLoaderData, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    //  console.log(user)
    if(loading){
        return <div className='flex justify-center items-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div> 
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}}></Navigate>
};

export default PrivetRoute;