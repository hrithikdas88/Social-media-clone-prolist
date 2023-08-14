import React from "react";
import RegisterForm from "components/RegisterForm/RegisterForm";
import useRegister from "./useRegister";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const register = useRegister();

  return (
    <div className="mainpage">
      <div className="conatiner">
        <div className="loginpage">
          <RegisterForm register={register} />
        </div>
      </div>
      <div className="image-conatiner">
        <img src="https://www.postbeyond.com/wp-content/uploads/2020/09/background-image-min.png" alt="" />
      </div>
    </div>
  );
};

export default RegisterPage;
