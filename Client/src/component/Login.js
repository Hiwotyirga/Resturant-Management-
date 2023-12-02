import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const nav = useNavigate();
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const handdlesubmit = async (event) => {
    event.preventDefault();
  
    try {
      const data = { name: nameReg, email: emailReg, password: passwordReg };
      const response = await axios.post("http://localhost:9000/users/login", data);
  
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
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
  

  return (
    <div>
      <form onSubmit={handdlesubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setNameReg(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/staff">Register</Link>
    </div>
  );
}

export default Login;
