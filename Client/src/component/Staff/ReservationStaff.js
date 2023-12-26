import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Input, theme, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Staff from "./Staff";
import Status from "./status";
import TableManagementSystem from "./TableManagementSystem";
import AddTable from "./AddTable";
import MenuList from "./Menu/Menu";
import Addmenu from "./Menu/Addmenu";
import FoodmenuItem from "./Menu/FoodmenuItem";
import AddFoodmenu from "./Menu/AddFoodmenuItem";
import Addbeaverageitem from "./AddbeaverageItem";
import BeaverageMenuItem from "./Menu/BeaverageMenuItem";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const ReservationStaff = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [list, setList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [postAll, setPostAll] = useState([]);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
    setSelectedCategoryId(null);
  };

  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  useEffect(() => {
    let mounted = true;

    if (selectedMenuItem === "2") {
      axios
        .get("http://localhost:9000/reservation")
        .then((response) => {
          if (mounted) {
            setPostAll(response.data);
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
  const Contents = () => {
    switch (selectedMenuItem) {
      case "1":
        return <div>Hello from Content 1</div>;
      case "2":
        return "";
      case "2-1":
        return <Addmenu />;
      case "2-2":
        return <AddFoodmenu />;
      case "2-3":
        return <Addbeaverageitem />;
      //  <Categoriess list={list} />;
      case "3":
        return <Status />;
      case "4":
        return <AddTable />;
      case "5":
        // Render the content for "Order" item
        return <div>Order Content</div>;
      default:
        return null;
    }
  };
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <div>Hello from Content 1</div>;
      case "2":
        return "";
      case "2-1":
        return <MenuList />;
      case "2-2":
        return <FoodmenuItem />;
      case "2-3":
        return <BeaverageMenuItem />;

      case "3":
        return <Staff />;
      case "4":
        return <TableManagementSystem />;
      case "5":
        return <div>Order Content</div>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "450vh" }}
      >
        <div className="demo-logo-vertical" />
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedMenuItem]}
          onClick={handleMenuClick}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Overview",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Menu",
              children: [
                {
                  key: "2-1",
                  label: "Add Menu",
                  icon: (
                    <span role="img" aria-label="food">
                      🍔
                    </span>
                  ),
                },
                {
                  key: "2-2",
                  label: "Add Food Item",
                  icon: (
                    <span role="img" aria-label="food">
                      🍔
                    </span>
                  ),
                },
                {
                  key: "2-3",
                  label: "Add Beverage Item",
                  icon: (
                    <span role="img" aria-label="beverage">
                      🥤
                    </span>
                  ),
                },
              ],
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: "Reservation Management",
            },
            {
              key: "4",
              icon: <VideoCameraOutlined />,
              label: "Table Management",
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: "Order",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer, height: 100 }}
        >
          <div style={{ display: "flex" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Contents />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReservationStaff;
