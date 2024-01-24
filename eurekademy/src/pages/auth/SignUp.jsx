// src/components/SignUpForm.js
import React, { useState } from 'react';
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)

  const validatePassword = (value) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return hasUppercase && hasNumber && hasSymbol;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validasi dinamis untuk password
    if (name === 'password') {
      setErrors({
        ...errors,
        [name]: validatePassword(value)
          ? null
          : 'Password harus mengandung huruf besar, angka, dan simbol.',
      });
    } else {
      setErrors({
        ...errors,
        [name]: value ? null : 'Field ini wajib diisi.',
      });
    }
  };

  const mapApiErrorsToFormErrors = (apiErrors) => {
    const mappedErrors = {};

    if (Array.isArray(apiErrors.message)) {
      apiErrors.message.forEach((message) => {
        console.log(message);
        const [field, errorMessage] = message.split(' ');
        if (field && errorMessage) {
          mappedErrors[field.toLowerCase()] = message;
        }
      });
    }

    return mappedErrors;
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'You have successfully registered.',
      showConfirmButton: true,
      customClass: {
        container: 'fixed inset-0 flex items-center justify-center', // Full screen and center
        title: 'text-2xl font-semibold mb-4 text-blue-600', // Tailwind CSS styling
        text: 'text-gray-800', // Tailwind CSS styling
        popup: 'max-w-md mx-auto p-6 bg-white border rounded', // Adjust popup styles
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/users', formData);

      // Handle successful response
      console.log('Form Submitted:', formData);
      setLoading(false);
      showSuccessAlert();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const apiErrors = error.response.data;
        const mappedErrors = mapApiErrorsToFormErrors(apiErrors);
        setErrors(mappedErrors);
      } else {
        // Handle other errors
        console.error('Error submitting form:', error.message);
      }
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== null);


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring focus:border-blue-300`}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring focus:border-blue-300`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring focus:border-blue-300`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
            hasErrors || loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={hasErrors || loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color="#fff" loading={loading} size={20} />{' '}
              <span className="ml-2">Loading...</span>
            </div>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;


