import React from "react";
import { useEffect } from "react";
import ErrorLogo from '../../assets/error_robot.png'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { APICore } from "../../helper/AxiosConfig";

const api = new APICore();

const Error404Component = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = api.isUserAuthenticated();
        if (!isAuthenticated) {
            navigate("/login");
        }

    }, [navigate]);
    return (
        <>
            {api.isUserAuthenticated() &&
                <div className="justify-center min-h-screen flex items-center">
                    <div className="px-4">
                        <div className=" items-center ">
                            <h1 className="py-4 text-xl  sm:text-3xl">This page can’t be found</h1>
                            <p className="py-3 text-blue-900 sm:text-base text-xs">This page may have moved or the URL is incorrect</p>
                            <Link to='/dashboard'>
                                <button class="bg-strong_blue text-white hover:bg-hover_blue font-bold py-2 px-4 rounded text-xs sm:text-base">
                                    Go Back
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:block" >
                        <img src={ErrorLogo} alt="bane-logo" className="w-96 h-96 py-12" />
                    </div>
                    <div>
                    </div>
                </div>
          
            }
        
        </>
    )
}


export default Error404Component;