import React from "react";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Addbeaverageitem = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: " center",
      }}
    >
      <div>
        <Link to="/addbeaverageitem2">
          <PlusOutlined
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
              width: "25px",
              height: "25px",
              background: "red",
              // display: "flex",
            }}
          />
        </Link>
      </div>
      <p style={{ marginTop: "15px" }}>Add Beaverage Item</p>
    </div>
  );
};

export default Addbeaverageitem;
