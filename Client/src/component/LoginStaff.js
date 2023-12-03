import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import * as yup from "yup";

function LoginStaff() {
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const hist = useNavigate();
  const handdlesubmit = async (event) => {
    event.preventDefault();

    try {
      const data = { name: nameReg, email: emailReg, password: passwordReg };
      const response = await axios.post(
        "http://localhost:9000/staff/login",
        data
      );

      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        hist("/staff");
      }
    } catch (error) {
      if (error.response) {
        alert(`Server error: ${error.response.status}`);
      } else if (error.request) {
        alert("No response received from the server. Please try again later.");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
      console.error(error);
    }
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <div className="Box">
      <form
        onSubmit={handdlesubmit}
        className="Body"
        validationSchema={validationSchema}
      >
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setNameReg(e.target.value);
          }}
          className="input"
        />
        <br />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
          className="input"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
          className="input"
        />
        <br />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      <br />
      <p className="input">OR</p>

      <Link to="/register" className="input">
        Register
      </Link>
    </div>
  );
}

export default LoginStaff;
