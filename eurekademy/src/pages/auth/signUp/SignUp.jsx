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
import { Link } from "react-router-dom";

const SignUp = () => {
    const authURL = ApiURLConstants.auth;

    const [showPassword, setShowPassword] = useState(false);

    const { formData, setFormData } = useFormData();

    const { validateDinamicPassword } = useValidation();

    const { errorHandler, errors, setErrors } = useErrorHandling();

    const { loading, startLoading, stopLoading } = useLoading();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validasi dinamis untuk password
        validateDinamicPassword(name, value, errors, setErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        startLoading();

        axios
            .post(authURL.signUp, formData)
            .then((response) => {
                // Handle successful response
                console.log("Form Submitted:", formData);
                stopLoading();
                SweetAllert(
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
                    if (
                        apiErrors.message === "Error sending verification email"
                    ) {
                        SweetAllert(
                            "error",
                            "Error send email",
                            "Failed send email, please check your connection"
                        );
                    } else {
                        errorHandler(apiErrors);
                    }
                } else {
                    console.error("Error submitting form:", error.message);
                }
            });
    };

    const hasErrors = Object.values(errors).some((error) => error !== null);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`mt-1 p-2 w-full border ${
                            errors.username
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded focus:outline-none focus:ring focus:border-blue-300`}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.username}
                        </p>
                    )}
                </div>
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
                        type={showPassword ? "text" : "password"}
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
                <div className="mb-4 flex space-x-2">
                    <input
                        type="checkbox"
                        id="showPassword"
                        name="password"
                        onChange={() => setShowPassword(!showPassword)}
                        className={`border focus:outline-none focus:border-blue-300`}
                    />
                    <label
                        htmlFor="showPassword"
                        className="block text-sm font-medium text-gray-600 "
                    >
                        Tampilkan password
                    </label>
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
                        "Sign Up"
                    )}
                </button>

                <Link to={"/login"}>
                    <div
                        className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer text-center mt-3`}
                    >
                        Login
                    </div>
                </Link>
            </form>
        </div>
    );
};

export default SignUp;

//TODO in case tidak ada sinyal buat kirim email
//TODO buatkan alert sinyal, klau email tidak terkirim
