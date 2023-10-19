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
import UserSettings from "./views/App/AppSettings";
import User from "./views/App/User";
import CompanySettings from "./views/App/CompanySettings";
import Roles from "./views/App/Roles";
import Currency from "./views/App/Currency";
import ChartOfAccount from "./views/App/ChartOfAccount";
import KeyAccountManager from "./views/App/KeyAccountManager";
import AddNewUser from "./views/App/AddNewUser";
import EditRole from "./views/App/EditRole";
import AddRole from "./views/App/AddRole";




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
                                }
                            ]
                        },
                        {
                            path:'roles',
                            element: <Roles/>,
                        },
                        {
                            path:'edit_role',
                            element: <EditRole/>,
                        },
                        {
                            path:'add_role',
                            element: <AddRole/>,
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
