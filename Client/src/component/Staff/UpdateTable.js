import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Tag, Modal, Input } from "antd";
import { useParams } from "react-router-dom";

const Staff = () => {
  const [reservations, setReservations] = useState([]);
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [Status, setStatus] = useState([]);
  const [value, setValue] = useState({
    TableNumber:""
  });
  const { Id } = useParams();
  const ShowModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    axios.put(`http://localhost:9000/reservation/${id}`, value )
      .then((res) => {
        console.log(res.data);
        setIsModalVisible(false);
      })
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setValue("");
  };
  return (
    <div>
      <h1>Reservation List</h1>
      <Modal
        title="Update Table Number"
        visible={IsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
  type="text"
  placeholder="Enter Table Number"
  name="TableNumber"
  onChange={(e) => setValue({ ...value, TableNumber: e.target.value })}
/>
      </Modal>
    </div>
  );
};

export default Staff;
