import React, { useEffect } from "react";
import Image from "../../assets/banelogo.png";
import TextInput from "../../components/TextInput";
import { useLocation } from "react-router-dom";

const PasswordReset = () => {
  const location = useLocation();
  const email = location.state;

  return (
    <div className="justify-center min-h-screen flex  items-center">
      <div className="w-80  max-h-max  shadow-xl sm:w-96 ">
        <div className="flex justify-center">
          <img src={Image} alt="bane-logo" className="w-24 py-12" />
        </div>
        <form className="space-y-4 ">
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
                // value={email.email}
                disabled
              />
            </div>
          </div>
          <div className="px-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              New Password
            </label>
            <div className="mt-2">
              <TextInput
                id="new_password"
                name="new_password"
                type="password"
                autoComplete="password"
                placeholder="Enter a New Password"
              />
            </div>
          </div>
          <div className="px-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <TextInput
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-b-lg  bg-strong_blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover_blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;