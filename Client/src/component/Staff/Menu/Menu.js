import React, { useEffect, useState } from "react";
import { Table, Space, Button, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/menu").then((res) => {
      setMenu(res.data);
    });
  });
  const columns = [
    {
      title: " Categorie",
      dataIndex: "categorie",
      key: "categorie",
    },
    {
      title: "Ingredients",
      dataIndex: "Ingredients",
      key: "Ingredients",
    },
    {
      title: "Group",
      dataIndex: "Group",
      key: "Group",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Poster",
      dataIndex: "postrer",
      key: "postrer",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <a>
            <Link to={`/editmenu/${data.id}`}>
              <EditOutlined />
            </Link>
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={menu} />
    </div>
  );
};

export default MenuList;
