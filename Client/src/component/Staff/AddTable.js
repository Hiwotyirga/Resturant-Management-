import React from "react";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AddTable = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
      // style={{

      //   //   flexDirection: "row",
      // }}
      >
        <Link to="addtable2">
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
      <p>AddTable</p>
    </div>
  );
};

export default AddTable;
