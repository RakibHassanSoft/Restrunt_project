import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaUpload, FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {
    const {name,category,recipe,image,price,_id} = useLoaderData()

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, reset } = useForm()
    // console.log(item)
    const onSubmit = async (data) => {
        // console.log(data)
        // image upload to imagebb and then get and url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log(imageFile)
        if (res.data.success) {
            // now send the menu item data to server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }

            //
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data)

            // if (menuRes.data.modifiedCount> 0) {
            //     //show success pooup
            //     //  reset()
            //     await Swal.fire({
            //         icon: "success",
            //         title: `${data.name} is updated added`,
            //         showConfirmButton: false,
            //         timer: 1500
            //     });
            // }
            // console.log(menuItem)
        }
    }
    return (
        <div>
            <SectionTitle heading={'Update item'} subHeading={'Update info'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name *</span>

                        </div>
                        <input defaultValue={name} {...register('name', { required: true })}
                            type="text" placeholder="Recipe Name" className="input input-bordered w-full my-6" />

                    </label>
                    <div className='flex gap-6'>
                        {/* category  */}

                        <div className='w-full '>
                            <label >
                                <div className="label">
                                    <span className="label-text">Recipe Name *</span>

                                </div>


                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">

                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price</span>

                                </div>
                                <input defaultValue={price} {...register('price', { required: true })}
                                    type="text" placeholder="Price" className="input input-bordered w-full " />

                            </label>
                        </div>

                        {/* price  */}
                    </div>
                    {/* recepe details  */}
                    <label className="form-control mt-3">
                        <div className="label">
                            <span className="label-text">Recipe details</span>
                        </div>
                        <textarea defaultValue={recipe}
                            {...register('recipe')}
                            className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                    </label>
                    <div className='w-full'>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full mt-3" />

                    </div>
                    <button className='btn mt-4'> Update menu item </button>
                </form>
            </div>

        </div>
    );
};

export default UpdateItem;