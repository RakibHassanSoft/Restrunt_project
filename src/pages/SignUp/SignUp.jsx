import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form"
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FcGoogle } from "react-icons/fc";
import SocailLogin from '../../components/SocialLogin/SocailLogin';
const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log(data)
        createUser(data.email, data.password)
            .then(async (result) => {
                // console.log(result.user)
                updateUser(data.name, data.photoURL)
                    .then(async () => {
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,

                        }
                        axiosPublic.post('/users', userInfo)
                            .then(async (res) => {
                                // console.log("User added to the database")
                                if (res.data.insertedId) {
                                    await Swal.fire({
                                        title: "Congratulation!",
                                        text: "Account Created successfully!",
                                        icon: "success"
                                    })
                                    reset()
                                    navigate('/')
                                }
                            })


                    })
                    .catch(async (err) => {
                        console.log(err)
                        await Swal.fire({
                            title: "Failed",
                            text: "Failed to Update account",
                            icon: "error"

                        });
                        reset()
                        navigate('/login')
                    })


                // User Created sucessfully
                //    await Swal.fire({
                //     title: "Congratulation!",
                //     // text: "Account Updated successfully!",
                //     text: "Account Created successfully!",
                //     icon: "success"
                //   })
                //   reset()
                //   navigate('/')


            })
            .catch(async (err) => {
                await Swal.fire({
                    title: "Failed",
                    text: "Failed to create account",
                    icon: "error"

                });
                reset()
                navigate('/login')
            })
        reset()
    }
    // console.log(watch("example"))

    return (
        <><Helmet>
            <title>Restunt | signup</title>
        </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} name='name' type="text" placeholder="Name" className="input input-bordered" required />
                                {errors.name && <span className='text-red-400'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo url</span>
                                </label>
                                <input {...register("photoURL", { required: true })} name='photoURL' type="text" placeholder="URL" className="input input-bordered" required />
                                {errors.photoURL && <span className='text-red-400'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" required />
                                {errors.email && <span className='text-red-400'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                {/* <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Password cannot exceed 10 characters"
                                        },
                                         pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
            message: "Password must include at least one letter, one number, and one special character"
          }
                                    })}
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                /> */}
                                <input
                                    {...register("password", {
                                        required: true

                                    })}
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password && <p>{errors.password.message}</p>}




                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />

                            </div>
                        </form>

                        <p className='mb-10 ml-10'><small >New here ? <Link to='/login' className='text-red-400'>Already have a new account</Link></small></p>
                        <div className="divider">OR</div>

                        <SocailLogin></SocailLogin>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SignUp;