import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import HomePage from "./component/HomePage";
import Categoriess from "./component/Category";
import CategoryDetail from "./component/CategoryDetail";
import TableManagementSystem from "./component/TableManagmentSystem";
import Register from "./component/Register";
import Login from "./component/Login";
import ReservationStaff from "./component/ReservationStaff";
import Staff from "./component/Staff";
import LoginStaff from "./component/LoginStaff";
import RegisterStaff from "./component/RegisterStaff";
import StaffList from "./component/StaffList";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [list, setList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (selectedMenuItem === "2") {
      axios
        .get("http://localhost:3333/categories")
        .then((response) => {
          if (mounted) {
            setList(response.data);
          }
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    }

    return () => {
      mounted = false;
    };
  }, [selectedMenuItem]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/categories" element={<Categoriess list={list} />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/table-managment" element={<TableManagementSystem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/staff" element={<ReservationStaff />} />
          <Route path="/staffs" element={<Staff />} />
          <Route path="/loginstaff" element={<LoginStaff />} />
          <Route path="/registerstaff" element={<RegisterStaff />} />
          <Route path="/staffList" element={<StaffList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
