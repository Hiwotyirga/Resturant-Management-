import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Popover } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BeaverageMenuItem = () => {
    const [list,setList]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:9000/menu/beaverage").then((res)=>{
            setList(res.data)

        })
    })
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
              </a>
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

export default BeaverageMenuItem
