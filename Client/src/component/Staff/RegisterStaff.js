// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import "./User/login.css"
//;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
// import { unstable_HistoryRouter } from "react-router-dom";

const RegisterStaff = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const hist = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:9000/staff", value).then((res) => {
      alert("you did it");
      hist("/staff");
    });
  };

  return (
    <div className="Box">
      <form className="body" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          className="input"
          onChange={onChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input"
          onChange={onChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input"
          onChange={onChange}
        />
        <br />
        <button  type="submit"className="button">Register</button>
      </form>
    </div>
  );
};

export default RegisterStaff;
