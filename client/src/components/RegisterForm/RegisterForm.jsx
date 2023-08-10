import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";

import "./RegisterForm.scss";

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

const RegisterForm = ({ register }) => {
  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={register}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>First Name</label>
            <Field type="text" name="firstName" className="form-control" />
            <ErrorMessage name="firstName" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <Field type="text" name="lastName" className="form-control" />
            <ErrorMessage name="lastName" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Location</label>
            <Field type="text" name="location" className="form-control" />
            <ErrorMessage name="location" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <Field type="text" name="occupation" className="form-control" />
            <ErrorMessage name="occupation" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Picture</label>
            <Dropzone
              className="dropzone"
              accept=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone-content">
                  <input {...getInputProps()} />
                  <div className="dropzone-text">
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <p>{values.picture.name}</p>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
            <ErrorMessage name="picture" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </div>

          <div className="form-group">
            <p>
              Already have an account? Login here.
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
