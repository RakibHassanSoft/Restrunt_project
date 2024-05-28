import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {data: isAdmin,isPending:isAdminLoading} = useQuery({
    queryKey:[user?.email,'isAdmin'],
    queryFn:async ()=>{
        const res = await axiosSecure.get(`/users/admin/${user.email}`)
        console.log(res.data);
        return res.data?.admin;
    }
    })

    return [isAdmin,isAdminLoading]
};

export default useAdmin;