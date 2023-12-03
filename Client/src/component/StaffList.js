import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const StaffList = () => {
  let { id } = useParams();
  const [postAll, setPostAll] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/reservation", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setPostAll(response.data);
      });
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:9000/reservation/${id}`)
      .then(() => {
        alert("Deleted Successfully");
        // Refresh the staff list after successful deletion
        axios
          .get("http://localhost:9000/reservation", {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            setPostAll(response.data);
          });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        alert("Error deleting item. Please try again.");
      });
  };

  const editreservation = (option) => {
    if (option === "edit") {
      const newreservation = prompt("Enter new update");
      axios.put("http://localhost:9000/reservation/update", {
        newreservation: newreservation,
        id: id,
      });
    }
  };

  return (
    <div>
      {postAll.map((value, key) => (
        <div
          key={key}
          className="add"
          style={{
            border: "1px solid",
            height: "50px",
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
            alignItems: "center",
            background: "yellow",
          }}
        >
          <div className="">{value.PhoneNumber}</div>
          <div className="">{value.Date}</div>
          <div className="">{value.Time}</div>
          <div className="">{value.NumberOfGuest}</div>
          <div className="">{value.Selection}</div>
          <div onClick={() => deleteItem(value.id)}>
            <DeleteOutlined />
          </div>
          <div className="edit" onClick={() => editreservation("edit")}>
            <EditOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
