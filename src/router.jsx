import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import PrivateLayout from "./components/PrivateLayout";
import Contact from "./views/Contact";
import Invoice from "./views/Invoice";
import ForgetPassword from "./views/ForgetPassword";
import PasswordReset from "./views/PasswordReset";



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
                    path:'passwordreset',
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
        }  
    ])
