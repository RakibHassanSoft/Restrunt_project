import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import { FaAllergies, FaBook, FaBookmark, FaCalendar, FaDollarSign, FaHome, FaList, FaPeopleArrows, FaPeopleCarry, FaUser, FaUsers, FaUtensils, FaVoicemail } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiContractLine } from "react-icons/ri";
import useAdmin from '../hooks/useAdmin';
const DashBoard = () => {

    //TODOL get isAdmin value from the database
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            {/* Dashboard sidebar  */}

            <div className="w-64 min-h-screen bg-orange-200">
                <h1 className='text-4xl text-center font-mono'>Dashboard</h1>
                <ul className='menu p-4'>
                    {
                        isAdmin ?
                            <>
                                <li>

                                    <NavLink to='/dashboard/adminHome'>
                                        <FaHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/additem'>
                                        <FaUtensils />
                                        Add items
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/manageItems'>
                                        <FaList />

                                        Manage items
                                    </NavLink>
                                </li>
                                
                                <li>

                                    <NavLink to='/dashboard/bookings'>
                                        <FaBook />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to='/dashboard/users'>
                                        <FaUsers />
                                       All users
                                    </NavLink>
                                </li>
                            </>
                            : <>
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

                                    <NavLink to='/dashboard/paymentHistory'>
                                        <FaDollarSign />
                                        Payment history
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
                                <li>

                                    <NavLink to='/dashboard/contract'>
                                        <RiContractLine />
                                        Contract
                                    </NavLink>
                                </li>
                            </>
                    }

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