import React from "react";
import Image from '../assets/banelogo.png'
import { Link } from "react-router-dom";

const ForgetPassword =()=>{
    return(
        <div className="justify-center min-h-screen flex  items-center">
        <div className="w-80  max-h-max shadow-xl sm:w-96 ">
            <div className="flex justify-center">
                <img src={Image} alt="bane-logo" className="w-24 py-12" />
            </div>
            <form className="space-y-20" >
                <div className="px-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Email Address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your E-mail"
                            className="block w-full border-b-2 border-gray-300 py-1.5 text-gray-900  placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6" 
                        />
                         
                    </div>
                </div>
                <div>
            <Link to="/login/createnewpassword">
            <button
                        type="submit"
                        className="flex w-full justify-center rounded-b-lg  bg-strong_blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover_blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
            </Link>
                </div>
            </form>
        </div>
    </div>
    )
}

export default ForgetPassword;