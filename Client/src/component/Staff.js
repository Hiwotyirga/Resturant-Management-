import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Staff = () => {
  const [postAll, setPostAll] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/reservation").then((response) => {
      setPostAll(response.data);
    });
  }, []);

  const deleteItem = (id) => {
    setPostAll((prev) => prev.filter((item) => item.id !== id));
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
          <div>
            <EditOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Staff;
