import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"
import * as yup from "yup"


function RegisterStaff() {
  const nav = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    axios.post("http://localhost:9000/staff")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Registration failed:", error);
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
        className="Body"
       
        onSubmit={handleSubmit}
        validationSchema={
          validationSchema
        }
      >
      
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            className="input"
          /><br />
       
   
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            className="input"
          /><br />
        

          <input
            type="password" 
            placeholder="password"
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            className="input"
          /><br />
     
          <button type="submit" className="button">Register</button>
        
      </form>
    </div>
  );
}

export default RegisterStaff;
