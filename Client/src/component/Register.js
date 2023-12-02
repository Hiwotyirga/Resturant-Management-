import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const nav = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   axios.get("http://localhost:9000/users").then((response) => {
  //     console.log(response);
  //   });
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    axios.post("http://localhost:9000/users")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div>
      <form
        className="container-fluid m-100"
        style={{ margin: "300px 300px 300px 500px", borderBlock: "solid" }}
        onSubmit={handleSubmit}
      >
        <div style={{ margin: "20px" }}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          /><br />
        </div>
        <div style={{ margin: "20px" }}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          /><br />
        </div>
        <div style={{ margin: "20px" }}>
          <input
            type="password" 
            placeholder="password"
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          /><br />
        </div>
        <div className="m-20">
          <button type="submit" className="bg-primary">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
