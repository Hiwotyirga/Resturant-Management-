import React from "react";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AddTable = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: " center",
      }}
    >
      <div
      // style={{

      //   //   flexDirection: "row",
      // }}
      >
        <Link to="/addtable2">
          <PlusOutlined
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",  

              width: "25px",
              height: "25px",
              background: "red",
            }}
          />
        </Link>
      </div>
      <p style={{marginTop:"15px"}}>AddTable</p>
    </div>
  );
};

export default AddTable;
