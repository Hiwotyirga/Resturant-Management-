import React, { useState } from "react";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import axios from "axios";
import './form.css'


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

  return (
    <div className="box">
      <form onSubmit={handdlesubmit} className="">
        <h1>Login</h1>
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          
          onChange={(e) => {
            setNameReg(e.target.value);
          }}
          className="input"
        />
        
        <br />
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
          className="input"
        />
        
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          errorMessage="password should be 4-16 characters"
          onChange={(e) => {
            setPasswordReg(e.target.value)
          }}
          className="input"
        />
      
        <br />
        <button type="submit" className="button">
          Login
        </button>
        <p className="input">OR</p>

<Link to="/register" className="">
  Register
</Link>
      </form>
      <br />
     
    </div>
  );
}

export default Login;
