import React, { useState } from "react";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./lo/gin.css";
import * as yup from "yup";

function Login() {
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const hist = useNavigate();
  // const dig=unstable_HistoryRouter
  const handdlesubmit = async (event) => {
    event.preventDefault();

    const data = { name: nameReg, email: emailReg, password: passwordReg };
    const response = await axios
      .post("http://localhost:9000/users/login", data)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.errror);
        } else {
          sessionStorage.setItem("accessToken", res.data);
          hist("/homepage");
        }
        // alert("didit");
        // console.log(res.data);
      });
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

export default Login;
