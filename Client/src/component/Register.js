import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(data) {
  const nav = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handdlesubmit = async (event) => {
    event.preventDefault();
    axios.post("http://localhost:9000/users").then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <form onSubmit={handdlesubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <input
          type="pass"
          placeholder="password"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
