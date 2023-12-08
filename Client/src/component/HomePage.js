import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Input, theme } from "antd";
import Categoriess from "./Category";
import CategoryDetail from "./CategoryDetail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./User/Login";
import Register from "./User/Register";
import TableManagementSystem from "./User/TableManagmentSystem";
import Table from "./User/table";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [list, setList] = useState([]);
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

      case "3":
        return (<TableManagementSystem />);
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <div>Hello from Content 1</div>;
      case "2":
        return <Categoriess list={list} />;

      case "3":
        return (<Table />);
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
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: "Table Management",
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
                <ul style={{ display: "flex" }}>
                  <li>
                    <Link to="/loginstaff">
                      <Button className="bg-primary">Login</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/homepage">
                      <Button className="bg-primary">Register</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/staffList">
                      <BellOutlined />
                    </Link>
                  </li>
                  <li>  <Link>{RenderContent()}</Link></li>
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
  );
};

export default HomePage;
