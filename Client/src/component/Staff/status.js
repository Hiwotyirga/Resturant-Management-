import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Input, theme, Card } from "antd";
import { useState,useEffect } from 'react'
import { Table, Space, Tag, Modal, } from "antd";
import axios from "axios"


const Status = () => {
  const [count,setCount]=useState({confirmcount:0,startedcount:0})
  useEffect(()=>{
axios.get("http://localhost:9000/reservation/count").then((res)=>{
  setCount(res.data)

})
  },[])
  return (
    <div style={{ display: "flex" }}>
      <Card style={{ marginLeft: "100px", width: "150px" }}>
        <p>CONFORMED</p>
        <p>{count.confirmcount}</p>
        <Link to="/confirm">View Details</Link>
        {/* {confirmcount} */}
      </Card>
      <Card style={{ marginLeft: "100px", width: "150px" }}>
        <p>CANCELLED</p>
        {/* <Link to="/cancle">View Details</Link> */}
      </Card>
      <Card style={{ marginLeft: "100px", width: "150px" }}>
       
        <p>STARTED  </p>
        <p>{count.startedcount}</p>

        <Link to="/started">View Details</Link>
      </Card>
      <Card style={{ marginLeft: "100px", width: "150px" }}></Card>
    </div>
  );
};

export default Status;
