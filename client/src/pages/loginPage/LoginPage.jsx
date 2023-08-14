import React from "react";
import LoginForm from "components/LoginForm/LoginForm";
import useLogin from "./useLogin";
 import './LoginPage.scss'

const LoginPage = () => {
  const login = useLogin();

  return (
    <div className="login-page-container">
      <div className="design-div">
        <img src="https://helios-i.mashable.com/imagery/articles/02lqCXhkauagYIlDHUtMkmh/hero-image.fill.size_1248x702.v1623369364.jpg" alt="" />
      </div>
      <div className="loginform-container">
        <LoginForm login={login} />
      </div>
    </div>
  );
};

export default LoginPage;
