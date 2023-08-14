import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";


const useRegisterForm = (register) => {
  const navigate = useNavigate();

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    picture: yup.mixed().required("Required"),
  });

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: null,
  };

  const handleSubmit = async (values) => {
    try {
      await register(values);
      toast.success("Registration successful!");
     
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return {
    registerSchema,
    initialValuesRegister,
    handleSubmit,
  };
};

export default useRegisterForm;
