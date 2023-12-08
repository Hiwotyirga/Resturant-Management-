import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import HomePage from "./component/HomePage";
import Categoriess from "./component/Category";
import CategoryDetail from "./component/CategoryDetail";
import TableManagementSystem from "./component/User/TableManagmentSystem";
import Register from "./component/User/Register";
import Login from "./component/User/Login";
import ReservationStaff from "./component/Staff/ReservationStaff";
import Staff from "./component/Staff/Staff";
import LoginStaff from "./component/Staff/LoginStaff";
import RegisterStaff from "./component/Staff/RegisterStaff";
import StaffList from "./component/User/StaffList";
import Table from "./component/User/table";
import Status from "./component/Staff/status";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/categories" element={<Categoriess />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/table-managment" element={<TableManagementSystem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/staff" element={<ReservationStaff />} />
          <Route path="/staffs" element={<Staff />} />
          <Route path="/table" element={<Table />} />
          <Route path="/loginstaff" element={<LoginStaff />} />
          <Route path="/registerstaff" element={<RegisterStaff />} />
          <Route path="/staffList" element={<StaffList />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
