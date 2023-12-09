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
    TableNumber: "",
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
  // const handleOk = () => {
  //   if (!reservationId) {
  //     alert("Please select a reservation to update.");
  //     return;
  //   }

  //   axios
  //     .put(`http://localhost:9000/reservation/${reservationId}`, value)
  //     .then((res) => {
  //       console.log(res.data);
  //       setIsModalVisible(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const edittable = (option) => {
     if (option === "table") {
       const newTable = prompt('Enter new table number');
        axios.put("http://localhost:9000/reservation/table", { newTable: newTable, id: Id }) 
        .then(response => { console.log("Table update response:", response.data); // Add the updated reservation to the state or refresh the reservations from the server 
      })
         .catch(error => { console.error("Table update error:", error); }); } };
  
  
  

  // const handleComfirm = () => {
  //   // console.log("Reservation ID:", reservationId);

  //   axios
  //     .put(`http://localhost:9000/reservation/comfirm/${Id}`, {
  //       Status: "comfirm",
  //     })
  //     .then(() => {
  //       setStatus("comfirm");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
          <a onClick={() => edittable("table")}>
            <EditOutlined />
          </a>
          <a 
          // onClick={() => handleComfirm(reservationId)}
          >
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
      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default Staff;
