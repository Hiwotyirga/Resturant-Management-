import React from "react";
import { useState, useEffect } from "react";
import { Table, Space, Tag, Modal, Input } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Cancled = () => {
  const [reservation, setReservations] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/reservation/cancel").then((res) => {
      setReservations(res.data);
    });
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "User.name",
      key: "name",
      render: (text, record) => (record.User ? record.User.name : "N/A"),
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Time",
      dataIndex: "Time",
      key: "Time",
    },
    {
      title: "Number of Guests",
      dataIndex: "NumberOfGuest",
      key: "NumberOfGuest",
    },
    {
      title: "Selection",
      dataIndex: "Selection",
      key: "Selection",
    },
    
    
  ];

  return (
    <div>
      <h1> Started Reservation List</h1>
      <Table columns={columns} dataSource={reservation} />
    </div>
  );
};

export default Cancled;
