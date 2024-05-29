import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { BsCart3 } from "react-icons/bs";
import useCart from '../../../hooks/useCart';
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext)
  //  console.log(user)
  const navigate = useNavigate()
  const [cart] = useCart()
  // console.log(cart)
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        navigate('/login')
      })
      .catch(err => console.log(err))
  }
  const navOptions =
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/menu'> Our menu</Link></li>
      <li><Link to='/order/salad'> Order</Link></li>
      <li><Link to='/secret'> Secret</Link></li>



      {
        user ? <>
          <li>
            <Link to='/dashboard/cart' className='    bg-opacity-50 border-0'>
              <BsCart3 className='text-white' />
              <div className="badge badge-secondary ml-1">{cart.length}</div>

            </Link>
          </li>
          <li><Link onClick={handleLogOut} >Logout</Link></li>
        </>
          : <>
            <li><Link to='/login'> Login</Link></li>
            <li><Link to='/signup'> Signup</Link></li>
          </>
      }


    </>
  return (
    <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BistroBoss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;