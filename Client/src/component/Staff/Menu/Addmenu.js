import React from "react";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Addmenu = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
      >
        <Link to="/addmenu2">
          <PlusOutlined
            style={{
              marginLeft: "5px",
              width: "25px",
              height: "25px",
              background: "red",
              display: "flex",
            }}
          />
        </Link>
      </div>
      <p>Add Menu</p>
    </div>
  );
};

export default Addmenu;
