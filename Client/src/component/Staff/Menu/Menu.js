import React, { useEffect, useState } from "react";
import { Table, Space, Button, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:9000/menu").then((res) => {
      setMenu(res.data);
    });
  });

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/menu/delete/${itemId}`
      );

      if (response.status === 200) {
        Swall.fire("Menu  deleted", "successfully");
      } else {
        console.error(`Error deleting menu item: ${response.data.error}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  const handlePrice = (priceId) => {
    const updateprice = prompt("Enter New Price");
    if (!updateprice) {
      return;
    }
    try {
      axios
        .put(`http://localhost:9000/menu/priceUpdate/${priceId}`, {
          price: updateprice,
        })
        .then((res) => {
          // console.log(res.data)
          setMenu((prevMenu) => {
            return prevMenu.map((menuItem) => {
              if (menuItem.id === priceId) {
                return { ...menuItem, price: updateprice };
              }
              return menuItem;
            });
          });
        });
      Swal.fire("UPdate Table", "success");
    } catch (error) {
      console.log(res.error);
    }
  };

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
          <a onClick={() => handleDelete(data.id)}>
            <DeleteOutlined />
          </a>
          <a onClick={() => handlePrice(data.id)}>
            <Button>Update Price</Button>
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
