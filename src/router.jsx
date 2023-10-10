import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import GuestLayout from "./components/Layout/GuestLayout";
import PrivateLayout from "./components/Layout/PrivateLayout";
import Contact from "./views/Contact";
import Invoice from "./views/Invoice";
import ForgetPassword from "./views/ForgetPassword";
import PasswordReset from "./views/PasswordReset";
import Error404Component from "./views/Error404Component";
import UserSettings from "./views/User/UserSettings";



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
                {
                    path:'user',
                    element:<UserSettings/>,
                    children:[
                        {
                            path:'settings',
                            element: <Contact/>,
                        },
                    ]
                },
            ]
        },

        {
            path: '*',
            element: <Error404Component/>
        }
    ])
