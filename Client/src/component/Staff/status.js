import React from 'react'
import { Layout, Menu, Button, Input, theme, Card } from "antd";
// import Categoriess from "./Category";
// import CategoryDetail from "./CategoryDetail";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Status = () => {
  return (

    <div style={{ display: "flex" }}>
    <Card style={{ marginLeft: "100px", width: "150px" }}>
      CONFORMED{" "}
    </Card>
    <Card style={{ marginLeft: "100px", width: "150px" }}>
      {" "}
      CANCELLED
    </Card>
    <Card style={{ marginLeft: "100px", width: "150px" }}>
      STARTED
    </Card>
    <Card style={{ marginLeft: "100px", width: "150px" }}></Card>
  </div>

  )
}

export default Status
