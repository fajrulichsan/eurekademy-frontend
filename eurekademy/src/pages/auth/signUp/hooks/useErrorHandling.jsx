import { useState } from "react";
const useErrorHandling = () => {
    const [errors, setErrors] = useState({});
    const mapApiErrorsToFormErrors = (apiErrors) => {
        const mappedErrors = {};

        if (Array.isArray(apiErrors.message)) {
            apiErrors.message.forEach((message) => {
                console.log(message);
                const [field, errorMessage] = message.split(" ");
                if (field && errorMessage) {
                    mappedErrors[field.toLowerCase()] = message;
                }
            });
        }

        return mappedErrors;
    };

    const errorHandler = (errorObj) => {
        const { errorField, nameField, errorAllert, message } = errorObj;
    
        // Jika errorField true, set error sesuai dengan nameField
        if (errorField) {
          setErrors({ [nameField]: message });
        } else {
          // Jika errorAllert true, handle secara khusus
          if (errorAllert) {
            // Lakukan sesuatu untuk menangani errorAllert
            console.log("Handling errorAllert:", message);
          } else {
            // Jika tidak ada errorField atau errorAllert, atur error umum
            setErrors({ general: message });
          }
        }
      };

    return { errorHandler, mapApiErrorsToFormErrors, errors, setErrors };
};

export default useErrorHandling;
