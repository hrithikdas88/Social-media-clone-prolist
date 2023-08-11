// useLoginForm.js
import React from "react";

import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";

const useLoginForm = (initialValues, validationSchema, onSubmit) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="email">
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? "error" : ""}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="errorMessage"
            />
          </div>
          <div className="password">
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.password && errors.password ? "error" : ""
              }
            />
          </div>
          <div>
            <button className="btn" type="submit">
              LOGIN
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default useLoginForm;
