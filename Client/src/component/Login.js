import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login(data) {
  const nav = useNavigate();
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const handdlesubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:9000/posts", {
          name: nameReg,
          email: emailReg,
          password: passwordReg,
        })
        .then((response) => {
          if ((response.data = "exist")) {
            nav("/test");
          } else if ((response.data = "notexist")) {
            alert("please first registered");
          }
        })
        .catch((e) => {
          alert("wrong");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }

    // const data = { name: nameReg, email: emailReg, password: passwordReg };
    // axios.post("http://localhost:9000/posts", data).then((response) => {
    //   console.log(response.data);
    // });
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
          type="pass"
          placeholder="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/register" />
    </div>
  );
}

export default Login;
