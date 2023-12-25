import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
import moment from "moment";

const Staff = () => {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [reservationid, setReservationId] = useState(null);
  const [reservarionStatus, setReservationStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [time, setTime] = useState({
    ActualArrivalTime: null,
  });

  const { id } = useParams();
  dayjs.extend(customParseFormat);

  const onChanges = (value, valueString) => {
    console.log(value, valueString);
    // setTime({ ActualArrivalTime: value });
  };

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

  const ShowPopover = () => {
    setPopoverVisible(true);
  };

  const closeTimePicker = () => {
    setPopoverVisible(false);
  };
  const saveTimepicker = () => {
    try {
      axios
        .put(`http://localhost:9000/reservation/actualtime/${id}`, {
          ActualArrivalTime: time.ActualArrivalTime.format("HH:mm:ss"),
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log({ error: "error" });
    }
  };

  // const onChange = (time, timeString) => {
  //   console.log(time, timeString);
  // };
  const content = (
    <div>
      <TimePicker
        onChange={onChanges}
        defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
        value={time.ActualArrivalTime ? dayjs(time.ActualArrivalTime) : null}
      />
      <Button onClick={closeTimePicker}>Cancel</Button>
      <Button
        type="primary"
        onClick={() => {
          saveTimepicker(id);
        }}
      >
        OK
      </Button>
    </div>
  );

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
        axios.get("http://localhost:9000/reservation/list").then((response) => {
          setReservations(response.data);
          Swal.fire("Confirmed", "Reservation confirmed successfully!");
        });
      })
      .catch((error) => {
        console.error("Confirmation error:", error);
      });
  };

  const edittable = async (reservationId) => {
    const newTable = prompt("Enter new table number");
    if (!newTable) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:9000/reservation/table/${reservationId}`,
        {
          TableNumber: newTable,
        }
      );

      console.log("Table update response:", response.data);

      setReservations((prevReservations) => {
        return prevReservations.map((reservation) => {
          if (reservation.id === reservationId) {
            return { ...reservation, TableNumber: newTable };
          }
          return reservation;
        });
      });

      // await handleFeeStatusUpdate(reservationId); // Wait for fee update before proceeding

      Swal.fire("Table Number", "Success full");
    } catch (error) {
      console.error("Table update error:", error);
    }
  };
  // const handleFeeStatusUpdate = async(reservationId) => {
  //   const newFeeStatus = prompt(`Is the user fee paid? (Type "fee" or "paid")`);
  //   if (!newFeeStatus) {const response = await axios.put(`http://localhost:9000/reservation/feestatus/${reservationId}`, {
  //     FeeStatus: newFeeStatus,
  //   });

  // setReservations((prevReservations) => {
  //   return prevReservations.map((reservation) => {
  //     if (reservation.id === reservationId) {
  //       return { ...reservation, FeeStatus: newFewStatus };
  //     }
  //     return reservation;
  //   });
  // });
  // Swal.fire("Actual Arival Time", "Success full");
  //     })
  //     .catch((error) => {
  //       console.error("fee update error:", error);
  //     });
  //   }
  // };

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
        axios.get("http://localhost:9000/reservation/list").then((response) => {
          setReservations(response.data);
          Swal.fire("Started", "Reservation Started successfully!");
        });
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
    // {
    //   title: "FeeStatus",
    //   dataIndex: "FeeStatus",
    //   key: "FeeStatus",
    // },
    {
      title: "ActualArrivalTime",
      dataIndex: "ActualArrivalTime",
      key: "ActualArrivalTime",
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
          <a onClick={ShowPopover}>
            <button>Arrival Time </button>
          </a>
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
      <div>
        <Popover
          title="Select Arrival Time"
          content={content}
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={(visible) => {
            if (!visible) closeTimePicker();
          }}
        ></Popover>
      </div>
    </div>
  );
};

export default Staff;
