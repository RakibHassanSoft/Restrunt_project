import React, { useDeferredValue, useEffect, useRef, useState,useContext } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'

const Login = () => {
    const {singIn} = useContext(AuthContext)

    const captchaRef = useRef(null)
    const [desabled, setDesabled] = useState(true)
     
    const navigate = useNavigate()
    const locaion = useLocation()

    const from = locaion.state?.from?.pathname || "/";
    // console.log(from)
    
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        singIn(email,password)
        .then(async(result) =>{
             console.log(result.user)
             await Swal.fire({
                title: "Congratulation!",
                text: "You are logged in successfully!",
                icon: "success"
              });
              navigate(from,{replace:true})
         

        })
        .catch(async(err)=>{
            await Swal.fire({
                title: "Failed",
                text: "There is a problem in your email and password",
                icon: "error"
               
              });
              navigate('/login')
              reset()
        })
    
    
    }

    const handleValidedCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;

        if (validateCaptcha(user_captcha_value) == true) {
            setDesabled(false)
        }
        else {
            setDesabled(true)
        }
    }
    return (
        <>
        <Helmet>
        <title>Restunt | signup</title>
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
          
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center  md:w-1/2  lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                < LoadCanvasTemplate />
                            </label>
                            <input name='captcha' type="text" ref={captchaRef} placeholder="Please type captcha above" className="input input-bordered" required />
                            <a onClick={handleValidedCaptcha} className="btn btn-outline btn-info btn-xs mt-3">Info</a>

                        </div>
                        <div className="form-control mt-6">
                           
                            <input disabled={desabled} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='mb-10 ml-10'><small >New here ? <Link to='/signup' className='text-red-400'>Create a new account</Link></small></p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;