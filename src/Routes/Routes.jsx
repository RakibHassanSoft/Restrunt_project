import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import Secret from "../pages/Shared/Secret/Secret";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
import DashBoard from "../Layout/DashBoard";
import Cart from "../pages/DashBoard/Cart/Cart";
import AllUsers from "../pages/DashBoard/Admin/AllUsers/AllUsers";
import AddItem from "../pages/DashBoard/Admin/AddItem/AddItem";
import UserHome from "../pages/DashBoard/User/UserHome/UserHome";
import AdminRoute from '../Routes/AdminRoute'
import ManageItem from "../pages/DashBoard/Admin/ManageItem/ManageItem";
import UpdateItem from "../pages/DashBoard/Admin/UpdateItem/UpdateItem";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymnetHistry from "../pages/DashBoard/PaymnetHistry/PaymnetHistry";
import AdminHome from "../pages/DashBoard/Admin/AdminHome/AdminHome";

 export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
          // element:<PrivetRoute><Home></Home></PrivetRoute>
        },{
          path:'/menu',
          element:<Menu></Menu>
       
        },{
          path:'/order/:catogory',
          element:<Order></Order>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },{
          path:'/secret',
         element:<PrivetRoute><Secret></Secret></PrivetRoute>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivetRoute><DashBoard></DashBoard></PrivetRoute>,
      children:[
        {
          path:'cart',
          element:<Cart></Cart>
        },
        {
            path:'payment',
            element:<Payment></Payment>
        },
        {
          path:'paymentHistory',
          element:<PaymnetHistry></PaymnetHistry>

        },{

          path:'userHome',
          element:<UserHome></UserHome>
        },



        //admin routes
        {
          path:'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        

        {
          path:'users',
          element:<AllUsers></AllUsers>
        },
        {
          path:'addItem',
          element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path:'manageItems',
          element:<AdminRoute><ManageItem></ManageItem></AdminRoute>
        },
        {
          path:'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params})=> fetch(`http://localhost:5000/menu/${params.id}`)
        }
      ]
    }
    
  ]);