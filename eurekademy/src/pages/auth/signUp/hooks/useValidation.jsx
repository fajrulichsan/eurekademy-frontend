
const useValidaion = () => {
    const validatePassword = (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
        return hasUppercase && hasNumber && hasSymbol;
    }

    const validateDinamicPassword = (name, value, errors, setErrors) =>{
        if (name === "password" ) {
            console.log("password change");

            setErrors({
                ...errors,
                [name]: value !== "" ? validatePassword(value) ? null : "Password harus mengandung huruf besar, angka, dan simbol." : "Field ini wajib diisi.",
            });

        } else {
            setErrors({
                ...errors,
                [name]: value ? null : "Field ini wajib diisi.",
            });
        }
    }

    return {validatePassword, validateDinamicPassword}
};

export default useValidaion;
