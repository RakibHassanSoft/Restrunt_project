import axios from 'axios';
import React from 'react';
const exiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})
const useAxiosSecure = () => {
    return exiosSecure
};

export default useAxiosSecure;