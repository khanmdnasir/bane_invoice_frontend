import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Auth/Login";
import GuestLayout from "./components/Layout/GuestLayout";
import PrivateLayout from "./components/Layout/PrivateLayout";
import Contact from "./views/Contact/Contact";
import Invoice from "./views/Invoice/Invoice";
import ForgetPassword from './views/Auth/ForgetPassword'
import PasswordReset from './views/Auth/PasswordReset';
import Error404Component from './views/Error/Error404Component';
import UserSettings from "./views/App/AppSettings";
import User from './views/User/User'
import CompanySettings from "./views/CompanySettings/CompanySettings";
import Roles from './views/Roles/Roles'
import Currency from "./views/App/Currency";
import ChartOfAccount from "./views/App/ChartOfAccount"
import KeyAccountManager from './views/KAM/KeyAccountManager'
import AddNewUser from "./views/User/AddNewUser";
import UserDetails from "./views/User/UserDetail";



   export const router = createBrowserRouter([
        {
            path:'/',
            element: <GuestLayout/>,
            children:[
                {
                    path:'',
                    element: <Login/>
                },
                {
                    path:'login',
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
                {
                    path:'app',
                    element:<UserSettings/>,
                    children:[
                        {
                            path:'company_settings',
                            element: <CompanySettings/>,
                        },
                        {
                            path:'user',
                            element: <User/>,
                            children:[
                                {
                                    path:'add_new_user',
                                    element: <AddNewUser/>, 
                                },
                                {
                                    path:'user_details',
                                    element: <UserDetails/>, 
                                }
                            ]
                        },
                        {
                            path:'roles',
                            element: <Roles/>,
                        },
                        {
                            path:'currency',
                            element: <Currency/>,
                        },
                      
                        {
                            path:'chart_of_accounts',
                            element: <ChartOfAccount/>,
                        },
                        {
                            path:'key_account_manager',
                            element: <KeyAccountManager/>,
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
