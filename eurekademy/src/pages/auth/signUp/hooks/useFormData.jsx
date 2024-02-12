import { useState } from "react";
const useFormData = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });

    return {formData, setFormData}
    
}

export default useFormData;