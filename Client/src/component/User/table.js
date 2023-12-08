import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Layout, Modal, Button, Input, InputNumber, Form } from "antd";
import { Card, Space, TimePicker, DatePicker, Radio } from "antd";
const { Header, Sider, Content } = Layout;

const Table = () => {
  return (
    <Layout>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "colorBgContainer",
          }}
        >
          <div></div>
          <div>
            <div style={{ width: "100%", display: "flex" }}>
              <Card
                style={{
                  width: "250px",
                  height: "100px",
                  backgroundColor: "grey",
                }}
              >
                Table1
              </Card>
              <div style={{ display: "flex", marginLeft: "100px" }}>
                <Card
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "grey",
                  }}
                >
                  Table2
                </Card>{" "}
                <Card
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "grey",
                  }}
                ></Card>
                <div style={{ marginLeft: "150px" }}> </div>
                <Card
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "grey",
                  }}
                >
                  Table3
                </Card>
              </div>
            </div>

            <div style={{}}>
              <div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <Card
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50px",
                        backgroundColor: "grey",
                        // margin: "100px 0 100  300px",
                        margin: "100px 0 0 150px",
                      }}
                    >
                      Table4
                    </Card>
                  </div>
                  <div>
                    <Card
                      style={{
                        width: "100px",
                        height: "100px",

                        backgroundColor: "grey",

                        margin: "150px 0 0 150px",
                      }}
                    >
                      Table9
                    </Card>
                  </div>
                  <Card
                    style={{
                      width: "150px",
                      height: "200px",
                      backgroundColor: "grey",

                      margin: "100px 0 70px 200px",
                    }}
                  >
                    Table5
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <Card
              style={{
                backgroundColor: "grey",
                width: "100px",
                height: "100px",
              }}
            >
              Table6
            </Card>
            <Card
              style={{
                backgroundColor: "grey",
                width: "300px",
                height: "100px",
                marginLeft: "100px",
              }}
            >
              Table7
            </Card>
            <div style={{ display: "flex", marginLeft: "100px" }}>
              <Card
                style={{
                  backgroundColor: "grey",
                  width: "100px",
                  height: "100px",
                }}
              >
                Table8
              </Card>
              <Card
                style={{
                  backgroundColor: "grey",
                  width: "100px",
                  height: "100px",
                }}
              ></Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Table;
