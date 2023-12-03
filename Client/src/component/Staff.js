import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from 'antd';

const Staff = () => {
  const [postAll, setPostAll] = useState([]);

  const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Time',
      dataIndex: 'Time',
      key: 'Time',
    },
    {
      title: 'Number of Guests',
      dataIndex: 'NumberOfGuest',
      key: 'NumberOfGuest',
    },
    {
      title: 'Selection',
      dataIndex: 'Selection',
      key: 'Selection',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => deleteItem(data.id)}>
            <DeleteOutlined />
          </a>
          <a>
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:9000/reservation").then((response) => {
      setPostAll(response.data);
    });
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:9000/reservation/${id}`).then(() => {
      alert("delete Successfully");                    
    });
  };

  return (
    <div>
      <Table columns={columns} dataSource={postAll} />
    </div>
  );
};

export default Staff;
