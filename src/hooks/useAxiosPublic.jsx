import axios from 'axios';
import React from 'react';
const exiosPublic = axios.create({
    baseURL:'http://localhost:5000'
})
const useAxiosPublic = () => {
    return exiosPublic
};

export default useAxiosPublic;