import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Input, theme, Card } from "antd";
import { useState, useEffect } from "react";
import { Table, Space, Tag, Modal } from "antd";
import axios from "axios";

const Status = () => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(0);
  const [cancle, setCancle] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:9000/reservation/confirm-count").then((res) => {
      setCount(res.data);
    });
  }, []);
  useEffect(() => { 
    axios.get("http://localhost:9000/reservation/start-count").then((res) => {
      setStart(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9000/reservation/cancel-count").then((res) => {
      setCancle(res.data);
    });
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Card style={{ marginLeft: "100px", width: "150px" }}>
        <p>CONFORMED</p>
        <p>{count}</p>
        <Link to="/confirm">View Details</Link>
        {/* {confirmcount} */}
      </Card>
      <Card style={{ marginLeft: "100px", width: "150px" }}>
        <p>CANCELLED</p>
        <p>{cancle}</p>
        <Link to="/cancle">View Details</Link>
        {/* <Link to="/cancle">View Details</Link> */}
      </Card>
      <Card style={{ marginLeft: "100px", width: "150px" }}>
        <p>STARTED </p>
        <p>{start}</p>

        <Link to="/started">View Details</Link>
      </Card>
      <Card style={{ marginLeft: "100px", width: "150px" }}></Card>
    </div>
  );
};

export default Status;
