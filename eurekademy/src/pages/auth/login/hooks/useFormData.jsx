import { useState } from "react";
const useFormData = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    return {formData, setFormData}
    
}

export default useFormData;