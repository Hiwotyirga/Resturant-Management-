import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Tag, Modal, Input } from "antd";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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

  useEffect(() => {
    axios
      .get("http://localhost:9000/reservation")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleOk = () => {
    axios.put("http://localhost:9000/reservation/table", value,{id:id})
      .then((res) => {
        console.log(res.data);
        setIsModalVisible(false);
      })
  };
  const handleComfirm = () => {
    axios
      .put(`http://localhost:9000/reservation/comfirm/${Id}`, {
        Status: "comfirm",
      })
      .then(() => {
        setStatus("comfirm");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValue("");
  };

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
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => deleteItem(data.id)}>
            <DeleteOutlined />
          </a>
          <a onClick={ShowModal}>
            <EditOutlined />
          </a>
          <a onClick={handleComfirm}>
            <button>Comform</button>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Reservation List</h1>
      <Table columns={columns} dataSource={reservations} />
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
