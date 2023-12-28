import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Categoriess from "./component/User/Menu/Category";
import CategoryDetail from "./component/User/Menu/CategoryDetail";
import ReservationManagmentSystem from "./component/User/ReservationManagmentSystem";
import Register from "./component/User/Register";
import Login from "./component/User/Login";
import ReservationStaff from "./component/Staff/ReservationStaff";
import Staff from "./component/Staff/Staff";
import LoginStaff from "./component/Staff/LoginStaff";
import RegisterStaff from "./component/Staff/RegisterStaff";
import StaffList from "./component/User/StaffList";
import Table from "./component/User/table";
import Status from "./component/Staff/status";
import Confirm from "./component/Staff/Confirm";
import Started from "./component/Staff/Started";
import Cancled from "./component/Staff/Cancled";
import NotificationBell from "./component/User/NotificationBell";
import TableManagementSystem from "./component/Staff/TableManagementSystem";
import AddTable from "./component/Staff/AddTable";
import AddTable2 from "./component/Staff/AddTable2";
import EditTable from "./component/Staff/EditTable";
import Beaverage from "./component/User/Menu/Beaverage";
import MenuList from "./component/Staff/Menu/Menu";
import Addmenu from "./component/Staff/Menu/Addmenu";
import Addmenu2 from "./component/Staff/Menu/Addmenu2";
import FoodmenuItem from "./component/Staff/Menu/FoodmenuItem";
import AddFoodmenu from "./component/Staff/Menu/AddFoodmenuItem";
import AddFoodmenu2 from "./component/Staff/Menu/AddFoodmenuitem2";
import BeaverageMenuItem from "./component/Staff/Menu/BeaverageMenuItem";
import Addbeaverageitem from "./component/Staff/AddbeaverageItem";
import AddbeaverageItem2 from "./component/Staff/Menu/AddbeaveragemenuItem2";
import EditMenu from "./component/Staff/Menu/EditMenu";
import BeaverageDetial from "./component/User/Menu/BeaverageDetial";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/categories" element={<Categoriess />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route
            path="/table-managment"
            element={<ReservationManagmentSystem />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/staff" element={<ReservationStaff />} />
          <Route path="/staffs" element={<Staff />} />
          <Route path="/table" element={<Table />} />
          <Route path="/loginstaff" element={<LoginStaff />} />
          <Route path="/registerstaff" element={<RegisterStaff />} />
          <Route path="/tablemanagement" element={<TableManagementSystem />} />
          <Route path="/staffList" element={<StaffList />} />
          <Route path="/status" element={<Status />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/started" element={<Started />} />
          <Route path="/cancle" element={<Cancled />} />
          <Route path="/notificationBell" element={<NotificationBell />} />
          <Route path="/addtable" element={<AddTable />} />
          <Route path="/addtable2" element={<AddTable2 />} />
          <Route path="/edittable/:id" element={<EditTable />} />
          <Route path="/beavarege" element={<Beaverage />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/addmenu" element={<Addmenu />} />
          <Route path="/addmenu2" element={<Addmenu2 />} />
          <Route path="/addfood" element={<FoodmenuItem />} />
          <Route path="/addfooditem" element={<AddFoodmenu />} />
          <Route path="/addfooditem2" element={<AddFoodmenu2 />} />
          <Route path="beaveragemenuitem" element={<BeaverageMenuItem />} />
          <Route path="/addbeavergeitem" element={<Addbeaverageitem />} />
          <Route path="/addbeaverageitem2" element={<AddbeaverageItem2 />} />
          <Route path="/editmenu/:id" element={<EditMenu />} />
          <Route path="/beaveragedetial" element={<BeaverageDetial />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
