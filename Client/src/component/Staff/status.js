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
  useEffect(()=>{
    axios.get("http://localhost:9000/reservation/cancel-count").then((res)=>{
      setCancle(res.data)
    })

  },[])


  const fetchReservationstart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/reservation/start-count"
      );
      setStart(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };
  const fetchReservationconfirm = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/reservation/confirm-count"
      );
      setCount(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };
  useEffect(() => {
   
    fetchReservationstart();
    // fetchReservationconfirm();

    const intervalId = setInterval(
      // fetchReservationconfirm,
      fetchReservationstart,
      10000
    );

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
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
