import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const FoodmenuItem = () => {
    const [list,setList]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:9000/menu/food").then((res)=>{
            setList(res.data)

        })
    })
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
    const columns = [
       
       
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
            title: "Ingredients",
            dataIndex: "Ingredients",
            key: "Ingredients",
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
              <a onClick={() => edittable(data.id)}>
                <EditOutlined />
              </a >
              <a onClick={() => handleDelete(data.id)}> <Button>Delete Item</Button></a>
              
            </Space>
          ),
        },
      ];
  return (
    <div>
        <h2>Food Item list</h2>
      <Table columns={columns} dataSource={list}/>
    </div>
  )
}

export default FoodmenuItem
