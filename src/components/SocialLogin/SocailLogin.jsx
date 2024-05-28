import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocailLogin = () => {
    const {signInByGoolge}= useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
   const navigate = useNavigate()


    const handleGoogleSignIn =()=>{
        signInByGoolge()
        .then(async(result)=>{
            console.log(result.user)
            const userInfo ={
                email:result.user?.email,
                name:result.user?.displayName
            }
            console.log(userInfo)
            axiosPublic.post('/users',userInfo)
            .then(async(res)=>{
                console.log(res.data)
                // if(res.data.insertedId!==null){
                    
                    await Swal.fire({
                        title: "Congratulation!",
                        text: "Account Created successfully!",
                        icon: "success"
                    })
                    navigate('/')
                // }
            })
            .catch(async (err) => {
                await Swal.fire({
                    title: "Failed",
                    text: "Failed to create account",
                    icon: "error"
    
                });
                navigate('/login')
            })
        })
        
    }
    return (
        <div className='p-4'>
            <button onClick={handleGoogleSignIn} className="btn w-full">
                <FaGoogle></FaGoogle>
                 Sign up with Google

            </button>
        </div>
    );
};

export default SocailLogin;