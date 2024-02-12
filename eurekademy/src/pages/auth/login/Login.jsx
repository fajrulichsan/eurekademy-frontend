// src/components/SignUpForm.js
import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import useFormData from "./hooks/useFormData";
import useValidation from "./hooks/useValidation";
import useLoading from "./hooks/useLoading";
import ApiURLConstants from "../../../constants/ApiURLConstants";
import SweetAllert from "../../../utils/sweetAllert";
import useErrorHandling from "./hooks/useErrorHandling";

const Login = () => {
    const authURL = ApiURLConstants.auth;

    const { formData, setFormData } = useFormData();

    const {validateDinamicPassword} = useValidation()

    const { errorHandler, errors, setErrors} = useErrorHandling();

    const {loading, startLoading, stopLoading} = useLoading();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validasi dinamis untuk password
        validateDinamicPassword(name, value, errors, setErrors)
        
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         startLoading();
    //         const response = await axios.post(authURL.login, formData);
    //         console.log(formData);
    //         console.log(authURL.login);
    //         console.log(response);

    //         // Handle successful response
    //         console.log("Form Submitted:", formData);
    //         stopLoading();
    //         SweetAllert.success(
    //             "success",
    //             "Registration Successful!",
    //             "You have successfully registered.",
    //             true
    //         );
    //     } catch (error) {
    //         stopLoading()
    //         if (error.response && error.response.status === 400) {
    //             const apiErrors = error.response.data;
    //             const mappedErrors = mapApiErrorsToFormErrors(apiErrors);
    //             setErrors(mappedErrors);
    //         } else {
    //             // Handle other errors
    //             console.error("Error submitting form:", error.message);
    //         }
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        startLoading();
      
        axios
          .post(authURL.login, formData)
          .then((response) => {
            // Handle successful response
            console.log("Form Submitted:", formData);
            stopLoading();
            SweetAllert.success(
              "success",
              "Registration Successful!",
              "You have successfully registered.",
              true
            );
          })
          .catch((error) => {
            console.log(error);
            stopLoading();
            if (error.response) {
              const apiErrors = error.response.data;
              errorHandler(apiErrors);
            } else {
              // Handle other errors
              console.error("Error submitting form:", error.message);
            }
          });
      };

    const hasErrors = Object.values(errors).some((error) => error !== null);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 p-2 w-full border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        } rounded focus:outline-none focus:ring focus:border-blue-300`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`mt-1 p-2 w-full border ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded focus:outline-none focus:ring focus:border-blue-300`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
                        hasErrors || loading
                            ? "cursor-not-allowed opacity-50"
                            : ""
                    }`}
                    disabled={hasErrors || loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <ClipLoader
                                color="#fff"
                                loading={loading}
                                size={20}
                            />{" "}
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;
