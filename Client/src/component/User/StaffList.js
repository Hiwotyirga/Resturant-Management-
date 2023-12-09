// import React, { useState, useEffect, useParams } from "react";
// import axios from "axios";

// const StaffList = () => {
//   const [reservations, setReservations] = useState([]);

//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch reservations when the component mounts
//     axios
//       .get(`http://localhost:9000/reservation/user?userId=${id}`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
//         },
//       })
//       .then((response) => {
//         setReservations(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching reservations:", error);
//       });
//   }, [id]);
//   const deleteReservation = (id) => {
//     axios
//       .delete(`http://localhost:9000/reservation/${id}`)
//       .then(() => {
//         alert("Reservation deleted successfully");
//         // Refresh the reservation list after successful deletion
//         axios.get("http://localhost:9000/reservation").then((response) => {
//           setReservations(response.data);
//         });
//       })
//       .catch((error) => {
//         console.error("Error deleting reservation:", error);
//         alert("Error deleting reservation. Please try again.");
//       });
//   };

//   const editReservation = (id) => {
//     // Add your edit reservation logic here
//   };

//   return (
//     // <div>
//       //{reservations.map((reservation) => (
//         // <div key={reservation.id} className="reservation">
//           // <div>{reservation.User.name}</div>
//           // <div>{reservation.PhoneNumber}</div>
//           // <div>{reservation.Date}</div>
//           // <div>{reservation.Time}</div>
//           // <div>{reservation.NumberOfGuest}</div>
//           // <div>{reservation.Selection}</div>

//           // </div>
//         // </div>
//       // ))}
//     // </div>
//     <div>
//   );
// };

// export default StaffList;
import React, { useState, useEffect } from "react";
import { Card, Col, Row, Space } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const StaffList = () => {
  const [reservations, setReservations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch reservations for the logged-in user when the component mounts
    axios
      .get(`http://localhost:9000/reservation/user`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, [id]);
  const deleteReservation = (id) => {
    axios
      .delete(`http://localhost:9000/reservation/${id}`)
      .then(() => {
        alert("Reservation deleted successfully");
        // Refresh the reservation list after successful deletion
        axios.get("http://localhost:9000/reservation").then((response) => {
          setReservations(response.data);
        });
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
        alert("Error deleting reservation. Please try again.");
      });
  };

  return (
    <div>
      <h1>Your Reservations</h1>
      <Row gutter={[16, 16]}>
        {reservations.map((reservation) => (
          <Col key={reservation.id} span={8}>
            <Card
              style={{ backgroundColor: "grey", color: "white" }}
              title={`Reservation on ${reservation.Date} at ${reservation.Time}`}
            >
              <Space direction="vertical">
                <p>Name:{reservation.User.name}</p>
                <p>phone Number: {reservation.PhoneNumber}</p>
                <p>Number of Guests: {reservation.NumberOfGuest}</p>
                <p>Selection: {reservation.Selection}</p>
              </Space>
              <div style={{ display: "flex", marginLeft: "30px" }}>
                <div onClick={() => deleteReservation(id)}>
                  <DeleteOutlined />
                </div>
                <div onClick={() => editReservation(reservation.id)}>
                  <EditOutlined />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StaffList;
