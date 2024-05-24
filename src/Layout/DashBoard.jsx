import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import { FaCalendar, FaHome, FaList } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineUnorderedList } from "react-icons/ai";
const DashBoard = () => {
    return (
        <div className='flex'>
            {/* Dashboard sidebar  */}
           
            <div className="w-64 min-h-screen bg-orange-200">
                <h1 className='text-4xl text-center font-mono'>Dashboard</h1>
                <ul className='menu p-4'>

                    <li>

                        <NavLink to='/dashboard/userHome'>
                            <FaHome />
                            User Home
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/dashboard/reservation'>
                            <FaCalendar />
                            Reservation
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/dashboard/review'>
                            <MdOutlinePreview />

                            Add Review
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/dashboard/cart'>
                            <BsCart3 />
                            My cart
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/dashboard/bookings'>
                            <FaList />
                            My bookings
                        </NavLink>
                    </li>
                </ul>
                <div className="divider">OR</div>
                <ul className='menu p-4'>
                    <li>

                        <NavLink to='/'>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/menu'>
                        <CiMenuBurger />
                            Menu
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/salad'>
                        <AiOutlineUnorderedList />
                            Order now
                        </NavLink>
                    </li>


                </ul>
            </div>
            {/* dash board content  */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;