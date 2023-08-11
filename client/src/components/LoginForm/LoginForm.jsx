// LoginForm.js
import React from "react";
import { Link } from "react-router-dom";
import useLoginForm from "./useLoginForm";
import * as yup from "yup";
import "./LoginForm.scss"

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = ({ setPageType, login }) => {
  const form = useLoginForm(initialValuesLogin, loginSchema, login);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono"
        rel="stylesheet"
      />
      <div id="wrapper">
        <div className="main-content">
          <div className="header">
            <img src="https://i.imgur.com/zqpwkLQ.png" alt="Logo" />
          </div>
          <div className="l-part">
            {form}
          </div>
        </div>
        <div className="sub-content">
          <div className="s-part">
            Don't have an account?<Link to='/register'>Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
