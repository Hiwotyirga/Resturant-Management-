import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  Input,
  theme,
  ConfigProvider,
  Breadcrumb,
} from "antd";
import Categoriess from "./User/Menu/Category";
import { notification } from "antd";
import CategoryDetail from "./User/Menu/CategoryDetail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./User/Login";
import Register from "./User/Register";
import ReservationManagmentSystem from "./User/ReservationManagmentSystem";
import Table from "./User/table";
import NotificationBell from "./User/NotificationBell";
import { Link } from "react-router-dom";
import Beaverage from "./User/Menu/Beaverage";

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
const item = [];

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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

  const RenderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return "";
      case "2":
        return "";
      case "2-1":
        return "";
      case "2-2":
        return "";
      case "3":
        return <ReservationManagmentSystem />;
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
        return <Categoriess list={list} />;
      case "2-2":
        return <Beaverage />;
      case "3":
        return <Table />;
      default:
        return null;
    }
  };

  const fetchReservationCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/reservation/userValidate-count"
      );
      setCount(response.data);
    } catch (error) {
      console.error("Error fetching reservation count:", error);
    }
  };

  useEffect(() => {
    fetchReservationCount();

    const intervalId = setInterval(fetchReservationCount, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBellClick = () => {
    console.log("Bell clicked");

    axios
      .put("http://localhost:9000/reservation/mark-reservations-as-read")
      .then(() => {
        console.log("Marked as read successfully");

        navigate("/staffList");

        setCount(0);

        notification.success({
          message: "Messages Marked as Read",
          description: "You have viewed all your messages.",
        });
      })
      .catch((error) => {
        console.error(
          "Error marking messages as read:",
          error.response ? error.response.data.error : error.message
        );
      });
  };

  return (
    <ConfigProvider>
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
                icon: <MenuOutlined />,
                label: "Menu",
                children: [
                  {
                    key: "2-1",
                    label: "Food",
                    icon: (
                      <span role="img" aria-label="food">
                        🍔
                      </span>
                    ),
                  },
                  {
                    key: "2-2",
                    label: "Beverage",
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
                icon: <UploadOutlined />,
                label: "Order",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
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
              <div>
                <nav>
                  <ul style={{ display: "flex", listStyleType: "none" }}>
                    <li>
                      <Link to="/loginstaff">
                        <Button className="bg-primary">Login</Button>
                      </Link>
                    </li>
                    <li style={{ marginLeft: "15px " }}>
                      <Link to="/homepage">
                        <Button className="bg-primary">Register</Button>
                      </Link>
                    </li>
                    <li style={{ marginLeft: "15px " }}>
                      <NotificationBell
                        count={count}
                        onClick={handleBellClick}
                      />
                    </li>
                    <li>
                      <Link>{RenderContent()}</Link>
                    </li>
                  </ul>
                </nav>
              </div>
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
    </ConfigProvider>
  );
};

export default HomePage;
