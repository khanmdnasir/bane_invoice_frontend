import React, { useState } from "react";
import Image from "../assets/banelogo.png";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  console.log(email);
  const [emailError, setEmailError] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform email validation before navigating
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return; // Don't navigate if there's an error
    }

    navigateTo(`/login/passwordreset`, { state: { email: email } });
  };

  const validateEmail = (inputEmail) => {
    return inputEmail.includes('@');
  };
  return (
    <div className="justify-center min-h-screen flex  items-center">
      <div className="w-80  max-h-max shadow-xl sm:w-96 ">
        <div className="flex justify-center">
          <img src={Image} alt="bane-logo" className="w-24 py-12" />
        </div>
        <form className="space-y-20" onSubmit={handleSubmit}>
          <div className="px-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              Email Address
            </label>
            <div className="mt-2">
              <TextInput
                id="email"
                type="email"
                name="email"
                value={email}
                placeholder="Enter your E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>
          <div>
            <Link to='/password_reset'>
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
  );
};

export default ForgetPassword;
