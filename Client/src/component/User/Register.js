import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";

function Register() {
  const nav = useNavigate();

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().required(),
    password: Yup.string().min(8).max(18).required("You must input password"),
  });

  const handleSubmit = (data) => {
    console.log("Submitting:", data);

    axios
      .post("http://localhost:9000/users", data)
      .then((response) => {
        console.log("API Response:", response.data);
        nav("/");
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <div className="box">
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <h1>Register</h1>
          <ErrorMessage name="name" component="span" />
          <Field
            autoComplete="off"
            name="name"
            placeholder="name"
            style={{ marginBottom: "10px" }} // Add margin-bottom for spacing
          />
          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            name="email"
            placeholder="email"
            style={{ marginBottom: "10px" }} // Add margin-bottom for spacing
          />
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            name="password"
            placeholder="password"
            style={{ marginBottom: "10px" }} // Add margin-bottom for spacing
          />
          <button type="submit" className="bg-primary">
            Submit
          </button>
          
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
