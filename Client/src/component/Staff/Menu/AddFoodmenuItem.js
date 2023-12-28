import React from "react";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AddFoodmenu= () => {
  return (
    <div style={{  display: "flex",
    alignItems: "center",
    justifyContent: " center", }}>
      <div
      >
        <Link to="/addfooditem2">
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
      <p style={{ marginTop: "15px" }}>Add FoodmenuItem</p>
    </div>
  );
};

export default AddFoodmenu;
