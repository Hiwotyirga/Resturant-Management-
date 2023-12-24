import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Table, Space, Button, Popover } from "antd";

const TableManagementSystem = () => {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/tablemanage").then((res) => {
      setTables(res.data);
    });
  }, []);
  const columns = [
    {
      title: "Table Number",
      dataIndex: "TableNumber",
      key: "TableNumber",
    },
    {
      title: "Indoor",
      dataIndex: "indoor",
      key: "indoor",
    },
    {
      title: "Seat Capacity",
      dataIndex: "SeatCapacity",
      key: "SeatCapacity",
    },
    {
      title: "VIP",
      dataIndex: "VIP",
      key: "VIP",
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
    },
    // {
    //   title: "TableNumber",
    //   dataIndex: "TableNumber",
    //   key: "TableNumber",
    // },
    // {
    //   title: "FeeStatus",
    //   dataIndex: "FeeStatus",
    //   key: "FeeStatus",
    // },
    // {
    //   title: "ActualArrivalTime",
    //   dataIndex: "ActualArrivalTime",
    //   key: "ActualArrivalTime",
    // },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, data) => (
    //     <Space size="middle">
    //       <a onClick={() => edittable(data.id)}>
    //         <EditOutlined />
    //       </a>
    //       <a onClick={() => confirmReservation(data.id)}>
    //         <button>Comform</button>
    //       </a>
    //       <a onClick={() => startReservation(data.id)}>
    //         <button>Start</button>
    //       </a>
    //       <a onClick={ShowPopover}>
    //         <button>Arrival Time </button>
    //       </a>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={tables} />
     
    </div>
  );
};

export default TableManagementSystem;
