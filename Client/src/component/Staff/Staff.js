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
  // const { Id } = useParams();

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

  const confirmReservation = (reservationId) => {
    axios
      .put(`http://localhost:9000/reservation/comfirm/${reservationId}`)
      .then(() => {
        // If you want to update the state with the new reservation status, you can do it here
        // For example, update the state with the modified reservation
        setReservations((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, Status: "confirm" };
            }
            return reservation;
          });
        });
        alert("Reservation confirmed successfully!");
      })
      .catch((error) => {
        console.error("Confirmation error:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValue("");
  };
  const edittable = (reservationId) => {
    const newTable = prompt("Enter new table number");
    if (!newTable) {
      // User cancelled the prompt
      return;
    }

    axios
      .put(`http://localhost:9000/reservation/table/${reservationId}`, {
        TableNumber: newTable,
      })
      .then((response) => {
        console.log("Table update response:", response.data);
        // If you want to update the state with the new reservation data, you can do it here
        // For example, update the state with the modified reservation
        setReservations((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, TableNumber: newTable };
            }
            return reservation;
          });
        });
      })
      .catch((error) => {
        console.error("Table update error:", error);
      });
  };
  const startReservation = (reservationId) => {
    axios
      .put(`http://localhost:9000/reservation/start/${reservationId}`)
      .then(() => {
        // If you want to update the state with the new reservation status, you can do it here
        // For example, update the state with the modified reservation
        setReservations((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, Start: "start" };
            }
            return reservation;
          });
        });
        alert("Reservation Started successfully!");
      })
      .catch((error) => {
        console.error("start error:", error);
      });
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
          <a onClick={() => edittable(data.id)}>
            <EditOutlined />
          </a>
          <a onClick={() => confirmReservation(data.id)}>
            <button>Comform</button>
          </a>
          <a onClick={() => startReservation(data.id)}>
            <button>Start</button>
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
