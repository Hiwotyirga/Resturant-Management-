// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import "./login.css";
// import * as yup from "yup";

// function LoginStaff() {
//   const [value, setValue]=useState({
//     name:"",
//     email:"",
//     password:""
//   })
//   const hist = useNavigate();
//   const handdlesubmit = async (event) => {
//     event.preventDefault();
//     axios.post("http://localhost:9000/staff/login",value).then((res)=>{
//       alert("succsess fully")
//       hist("/registerstaff")
//     })     
//   }

//   return (
//     <div className="Box">
//       <form
//         onSubmit={handdlesubmit}
//         className="Body"
//         // validationSchema={validationSchema}
//       >
//         <input
//           type="text"
//           placeholder="name"
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           className="input"
//         />
//         <br />
//         <input
//           type="email"
//           placeholder="email"
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           className="input"
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="password"
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           className="input"
//         />
//         <br />
//         <button type="submit" className="button">
//           Login
//         </button>
//       </form>
//       <br />
//       <p className="input">OR</p>

//       <Link to="/registerStaff" className="input">
//         Register
//       </Link>
//     </div>
//   );
// }

// export default LoginStaff;
import React from 'react'
import { useState } from 'react'
import "./register.css"
import axios from 'axios'
import { Form } from 'antd'
import { useNavigate ,Link } from 'react-router-dom'


const LoginStaff = () => {
  const hist=useNavigate();
  const [value,setValue]=useState({
    name:"",
    email:"",
    password:""

  })
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const onSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:9000/staff/login", value).then(() => {
      alert("you did it");
      // console.log(res.data)
      hist("/staff");
    });
     
  }

  return (
    <div className='Box'>
      <Form className="body" onSubmit={onSubmit}>
        <input
        type='text'
        name='name'
        placeholder='please enter your name'
        className='input'
        onChange={onChange}
        
        /><br/>
         <input
        type='email'
        name='email'
        placeholder='please enter your email'
        className='input'
        onChange={onChange}
        
        /><br/>
         <input
        type='password'
        name='password'
        placeholder='please enter your password'
        className='input'
        onChange={onChange}
        
        /><br/>
       <button type="submit" className="button">
          Login
        </button>
      </Form>
      <br />
      <p className="input">OR</p>

      <Link to="/register" className="input">
        Register
      </Link>
    </div>
  )
}

export default LoginStaff

