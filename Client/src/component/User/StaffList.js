import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const StaffList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/reservation",{ headers: {
      accessToken: sessionStorage.getItem("accessToken"),
    },}).then((response) => {
      setReservations(response.data);
    });
  }, []);

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

  const editReservation = (id) => {
    // Add your edit reservation logic here
  };

  return (
    <div>
      {reservations.map((reservation) => (
        <div key={reservation.id} className="reservation">
          <div>{reservation.User.name}</div>
          <div>{reservation.PhoneNumber}</div>
          <div>{reservation.Date}</div>
          <div>{reservation.Time}</div>
          <div>{reservation.NumberOfGuest}</div>
          <div>{reservation.Selection}</div>
          <div onClick={() => deleteReservation(reservation.id)}>
            <DeleteOutlined />
          </div>
          <div onClick={() => editReservation(reservation.id)}>
            <EditOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffList;