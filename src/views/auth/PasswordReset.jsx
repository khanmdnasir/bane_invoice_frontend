import React, { useEffect, useState } from "react";
import Image from "../../assets/images/banelogo.png";
import TextInput from "../../components/TextInput";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import instance from '../../helper/AxiosConfig';

const PasswordReset = () => {
  const location = useLocation();
  // const data = location.state;
  const searchParams = new URLSearchParams(location.search);// for get token by url
  const token = searchParams.get("token");

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "afroza@aslgroup.com.bd",
    new_password: "",
    confirm_password: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({

    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    // Set a timeout to clear the token expiration message after 1 min
    const tokenExpirationTimeout = setTimeout(() => {
      setTokenExpired(true);
    }, 60000);

    return () => clearTimeout(tokenExpirationTimeout); // Cleanup the timer on unmount
  }, [tokenExpired]);

  //Set Form Data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: value,
    });

    // Clear the error message for the input field that changed
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (tokenExpired) {
    //   setSubmitError(!tokenExpired);
    //   return;
    // }

    const passwordErrors = { new_password: "", confirm_password: "" };
    const isPasswordSimilarToEmail = forgotPasswordData.email.includes(forgotPasswordData.new_password);


    if (!forgotPasswordData.new_password) {
      passwordErrors.new_password = "New Password is required";
    } else if (isPasswordSimilarToEmail) {
      passwordErrors.new_password = "Password is too similar to the username.";
    } else if (forgotPasswordData.new_password.length < 8) {
      passwordErrors.new_password =
        "This password is too short. It must contain at least 8 characters.";
    }

    if (!forgotPasswordData.confirm_password) {
      passwordErrors.confirm_password = "Confirm Password is required";
    } else if (
      forgotPasswordData.new_password !== forgotPasswordData.confirm_password
    ) {
      passwordErrors.confirm_password = "Passwords do not match";
    }

    setErrors(passwordErrors);

    if (!passwordErrors.new_password && !passwordErrors.confirm_password) {
      const data = {
        password: forgotPasswordData.new_password,
        token: token,
      };

      try {

        instance.post("/password_reset/confirm/", data)
          .then((response) => {
            console.log("Password reset successful", response.data);
            setSubmitSuccess("Password reset successful");
            setTokenExpired(false);
          })
          .catch((error) => {

            setSubmitError("Password reset failed");

            setTokenExpired(false);
          });
      } catch (error) {
        console.log(error);
      }
      // console.log("Form submitted successfully", data);


      // Reset the password fields
      setForgotPasswordData({
        ...forgotPasswordData,
        new_password: "",
        confirm_password: "",
      });
    }
  };

  return (
    <div className="justify-center min-h-screen flex  items-center">
      <div className="w-80  max-h-max  shadow-xl sm:w-96 ">
        <div className="flex justify-center">
          <img src={Image} alt="bane-logo" className="w-24 py-12" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <div className="px-4">
          
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email Address
            </label>
            <div className="mt-2">
              <TextInput
                ClassName="!text-gray-500"
                id="email"
                type="email"
                name="email"
                value={forgotPasswordData.email}
                readOnly={true}
              />
            </div>
          </div> */}
          <div className="px-4">
            {tokenExpired ? <p className="text-red-500 text-sm mb-6">Token has expired. Please request a new password reset link.</p> : null}
            {submitError && !tokenExpired ? (
              <p className="text-red-500 text-sm mb-6">{submitError}</p>
            ) : null}
            {submitSuccess && (
              <p className="text-strong_blue text-sm mb-6">{submitSuccess}</p>
            )}
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              New Password
            </label>
            <div className="mt-2 relative">
              <TextInput
                id="new_password"
                name="new_password"
                type={newPasswordVisible ? "text" : "password"}
                value={forgotPasswordData.new_password}
                autoComplete="password"
                placeholder="Enter a New Password"
                error={errors.new_password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={newPasswordVisible ? faEyeSlash : faEye}
                className="password-icon absolute right-0 top-2 text-gray-400 cursor-pointer"
                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
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
            <div className="mt-2 relative">
              <TextInput
                id="confirm_password"
                name="confirm_password"
                type={confirmPasswordVisible ? "text" : "password"}
                value={forgotPasswordData.confirm_password}
                autoComplete="password"
                placeholder="Confirm Password"
                error={errors.confirm_password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                className="password-icon absolute right-0 top-2 text-gray-400 cursor-pointer"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={tokenExpired}
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
