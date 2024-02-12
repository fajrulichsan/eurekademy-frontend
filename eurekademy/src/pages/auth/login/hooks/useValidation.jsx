
const useValidaion = () => {
    const validatePassword = (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
        return hasUppercase && hasNumber && hasSymbol;
    }

    const validateDinamicPassword = (name, value, errors, setErrors) =>{
        if (value === "") {
            setErrors({
                ...errors,
                [name]: value ? null : "Field ini wajib diisi.",
            });
        }else{
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    }

    return {validatePassword, validateDinamicPassword}
};

export default useValidaion;
