import React, { useState } from "react";
import Image from '../assets/banelogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isValidEmail = (email) => {

        return email.includes('@');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = { email: '', password: '' };

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {

            console.log("Form data to be sent:", formData);

        }
    };

    return (
        <div className="justify-center min-h-screen flex  flex-col items-center">
            <div className="w-80  max-h-max shadow-xl sm:w-96 ">
                <div className="flex justify-center">
                    <img src={Image} alt="bane-logo" className="w-24 py-12" />
                </div>
                <form className="space-y-4 " onSubmit={handleSubmit}>
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
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="px-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={passwordVisible ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                placeholder="Password"
                                className="block w-full border-b-2 border-gray-300 py-1.5 text-gray-900  placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                            />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className="password-icon absolute right-0 top-2 text-gray-400 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-b-lg  bg-strong_blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover_blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>

                </form>
              
            </div>
            <div className="text-sm flex justify-center mt-4">
                    <a href="login/forgetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>
                </div>
        </div>
    )
}

export default Login;