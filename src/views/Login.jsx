import React, { useState, useEffect } from "react";
import Image from '../assets/banelogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import TextInput from "../components/TextInput";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    console.log(isAuthenticated);

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

    useEffect(() => {
        if (isAuthenticated == true) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])
    
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
            dispatch(loginRequest(formData));


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
                            <TextInput
                                type="email"
                                name="email"
                                placeholder="Enter your E-mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                        </div>
                    </div>

                    <div className="px-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 relative">
                            {/* Use the TextInput component */}
                            <TextInput
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={errors.password}
                            />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className="password-icon absolute right-0 top-2 text-gray-400 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
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
    );
};

export default Login;