import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Contact from "../views/Contact";
import Invoice from "../views/Invoice";
import Error404Component from "../views/error/Error404Component";
import Login from "../views/auth/Login";
import ForgetPassword from "../views/auth/ForgetPassword";
import PasswordReset from "../views/auth/PasswordReset";
import GuestLayout from "./GuestLayout";
import PrivateLayout from "./PrivateLayout";




   export const router = createBrowserRouter([
        {
            path:'/login',
            element: <GuestLayout/>,
            children:[
                {
                    path:'/login',
                    element: <Login/>
                },
    
                {
                    path:'forgetpassword',
                    element: <ForgetPassword/>
                },
                {
                    path:'password_reset',
                    element: <PasswordReset/>
                },
            ]
        },

    
        {
            path:'/',
            element:<PrivateLayout/>,
            children:[
                {
                    path:'dashboard',
                    element:<Dashboard/>
                },
                {
                    path:'invoice',
                    element:<Invoice/>
                },
                {
                    path:'contact',
                    element:<Contact/>
                },
            ]
        },
        {
            path: '*',
            element: <Error404Component/>
        }
    ])
