import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Popover, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const Staff = () => {
  const [reservations, setReservations] = useState([]);
  const [reservarionStatus, setReservationStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9000/reservation/list")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const content = (
    <div>
      <DatePicker
        onChange={(date) => {
          closeDatePicker();
          // Process the selected date
        }}
      />
      <Button onClick={closeDatePicker}>Cancel</Button>
      <button onClick={saveTimepicker}>OK</button>
    </div>
  );

  const promptForDate = () => {
    // Use setPopoverVisible to control the visibility
    setPopoverVisible(true);

    const closeDatePicker = () => {
      setPopoverVisible(false);
    };

    const saveTimepicker = () => {
      setPopoverVisible(false);
      // Add logic to save the selected date
    };}
  const confirmReservation = (reservationId) => {
    axios
      .put(`http://localhost:9000/reservation/comfirm/${reservationId}`)
      .then((res) => {
        console.log(res.data);
        setReservations((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, Status: "confirm" };
            }
            return reservation;
          });
        });
        Swal.fire("Confirmed", "Reservation confirmed successfully!");
      })
      .catch((error) => {
        console.error("Confirmation error:", error);
      });
  };

  const edittable = (reservationId) => {
    const newTable = prompt("Enter new table number");
    if (newTable !== null && newTable.trim() !== "") {
      return;
    }
    axios
      .put(`http://localhost:9000/reservation/table/${reservationId}`, {
        TableNumber: newTable,
      })
      .then((response) => {
        console.log("Table update response:", response.data);

        setReservations((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, TableNumber: newTable };
            }
            return reservation;
          });
        });
        Swal.fire("Table Number", "Success full");
      })
      .catch((error) => {
        console.error("Table update error:", error);
      });
    handleFeeStatusUpdate();
  };

  const handleFeeStatusUpdate = () => {
    const newFewStatus = prompt(
      `is the user fee paid? (Type "fee" or "paid")`
    );
    
  };

  const startReservation = (reservationId) => {
    axios
      .put(`http://localhost:9000/reservation/start/${reservationId}`)
      .then((res) => {
        console.log(res.data);
        setReservations((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, Status: "started" };
            }
            return reservation;
          });
        });
        Swal.fire("Started", "Reservation Started successfully!");
      })
      .catch((error) => {
        console.error("start error:", error);
      });
  };

  const handleStatusChange = (newStatus) => {
    axios
      .post("http://localhost:9000/reservation/update-status", {
        Stuation: newStatus,
      })
      .then((response) => {
        setReservationStatus(newStatus);
        console.log("Reservation status updated to:", newStatus);
      })
      .catch((error) => {
        console.error(error);
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
      title: "TableNumber",
      dataIndex: "TableNumber",
      key: "TableNumber",
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
          <Popover
            title="Select Reservation Date"
            content={content}
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={(visible) => {
              if (!visible) closeDatePicker();
            }}
          >
            <Button>Arrival Time</Button>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ margin: "20px 10px 10px 750px", justifyContent: "end" }}>
        <p>{reservarionStatus}</p>
        <button
          onClick={() => handleStatusChange("open")}
          disabled={loading || reservarionStatus === "open"}
          className="bg-primary"
          style={{ margin: "10px" }}
        >
          Open Reservation
        </button>
        <button
          onClick={() => {
            handleStatusChange("closed");
          }}
          disabled={loading || reservarionStatus === "closed"}
          className="bg-danger"
          style={{ margin: "10px" }}
        >
          Close Reservation
        </button>
      </div>
      <h1>New Reservation List</h1>
      <Table columns={columns} dataSource={reservations} />
    </div>
  );
};

export default Staff;