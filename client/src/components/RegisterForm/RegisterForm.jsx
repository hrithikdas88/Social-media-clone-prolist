import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import "./RegisterForm.scss"
import useRegisterForm from "./useRegisterForm";
import { ToastContainer } from "react-toastify";

const RegisterForm = ({ register }) => {
  const {
    registerSchema,
    initialValuesRegister,
    handleSubmit,
  } = useRegisterForm(register);

  return (
    <div className="registration-container">
      <h1 className="registration-heading">Create an Account</h1>
      <Formik
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>First Name</label>
              <Field type="text" name="firstName" className="form-control" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <Field type="text" name="lastName" className="form-control" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <Field type="text" name="location" className="form-control" />
              <ErrorMessage
                name="location"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Occupation</label>
              <Field type="text" name="occupation" className="form-control" />
              <ErrorMessage
                name="occupation"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Picture</label>
              <Dropzone
                className="dropzone"
                accept=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone-content">
                    <input {...getInputProps()} />
                    <div className="dropzone-text">
                      {!values.picture ? (
                        <BiImageAdd style={{ fontSize: '2.5rem' }} />
                      ) : (
                        <p>{values.picture.name}</p>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
              <ErrorMessage
                name="picture"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                REGISTER
              </button>
            </div>

            <div className="form-group">
              <p>
                Already have an account? <Link to="/">Login here.</Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer/>
    </div>
  );
};

export default RegisterForm;
