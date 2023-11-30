import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Input, theme } from "antd";
import Categoriess from "./Category";
import CategoryDetail from "./CategoryDetail"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TableManagementSystem from "./TableManagmentSystem";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [list, setList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track the selected category id
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
    setSelectedCategoryId(null); // Reset selectedCategoryId when a menu item is clicked
  };

  const handleSearch = (value) => {
    // Implement your search logic here
    console.log("Search:", value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Set the selected category id
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

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <div>Hello from Content 1</div>;
      case "2":
        return <Categoriess list={list} />;

      // <ContentUI list={list} onCategoryClick={handleCategoryClick} />

      case "3":
        navigate("/table-managment");
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
