import React from "react";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Addbeaverageitem = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <Link to="/addbeaverageitem2">
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
      <p>Add Beaverage Item</p>
    </div>
  );
};

export default Addbeaverageitem;
