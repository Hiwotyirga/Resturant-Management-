import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Layout, Modal, Button, Input, InputNumber, Form } from "antd";
import { Card, Space, TimePicker, DatePicker, Radio } from "antd";
// import {Formik,ErrorMessage,Form} from "formik";
import moment from "moment";
import * as yup from "yup";
const { Header, Sider, Content } = Layout;
const { Search } = Input;
import axios from "axios";

const TableManagementSystem = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [postAll, setPostAll] = useState([]);
  const [values, setValues] = useState({
    PhoneNumber: "",
    Date: "",
    Time: "",
    NumberOfGuest: "",
    Selection: "",
  });

  const handleValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date, dateString) => {
    handleValue("Date", dateString);
    onChangeDate(date, dateString);
  };

  const handleChange = () => {
    setIsModalVisible(false);
  };
  const onChangeTime = (time, timeString) => {
    handleValue("Time", timeString);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const onSubmit = (values) => {
    setIsModalVisible(false);
    axios.post("http://localhost:9000/reservation"
    // ,{
    //   headers:{
    //     accessToken:sessionStorage.getItem("accessToken")
    //   }}
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Registration failed:", error);
      });
      
      // .then((response) => {
      //   if (response.values.error){
      //     alert(response.values.error)
      //   }
      //   console.log("Form Values:", values);
      // })
      // .catch((error) => {
      //   console.error("Error submitting the form:", error);
      // });
  };

  const validationSchema = yup.object().shape({
    Date: yup.string().required(),
    Time: yup.string().required(),
    Selection: yup.string().required(),
    PhoneNumber: yup
      .string()
      .matches(/^\d+$/, "Phone number must be numeric")
      .required("Phone number is required"),
    NumberOfGuest: yup
      .number()
      .positive("Number of guests must be a positive number")
      .integer("Number of guests must be an integer")
      .required("Number of guests is required"),
  });

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
          <div style={{}}>
            <Button
              className="ml-500px inline-flex items-center "
              style={{
                marginLeft: "650px",
                backgroundColor: "blue",
                color: "white",
                mode: "inline",
              }}
            >
              <div style={{ display: "flex" }} onClick={showModal}>
                <PlusOutlined />
                New Reservation
              </div>
            </Button>
          </div>
          <div>
            <Form
              // onFinish={onFinish}
              initialValues={values}
              validationSchema={validationSchema}
            >
              <Modal
                title="New Reservation"
                visible={isModalVisible}
                onOk={() => onSubmit(values)}
                onCancel={handleCancel}
                width={850}
              >
                <div
                  style={{
                    mode: "inline",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Card
                    style={{
                      alignItems: "center",
                      width: "1000px",
                    }}
                  >
                    <div style={{ marginLeft: "200px" }}>
                      <div style={{ justifyContent: "center" }}>
                        <div style={{ margin: "23px" }}>
                          <label style={{ fontWeight: "bold" }}>
                            Reservation Details
                          </label>
                        </div>
                        <div>
                          <div style={{ display: "flex" }}>
                            <label style={{ fontWeight: "bold" }}>Date</label>

                            <Space
                              direction="vertical"
                              style={{
                                marginBottom: "25px",
                                marginLeft: "100px",
                              }}
                            >
                              <DatePicker
                                name="Date"
                                value={values.Date ? moment(values.Date) : null}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                              />
                            </Space>
                          </div>
                        </div>
                        <div style={{ display: "flex", marginBottom: "20px" }}>
                          <div>
                            <label style={{ fontWeight: "bold" }}>Time</label>
                          </div>

                          <div>
                            <TimePicker
                              open={open}
                              onOpenChange={setOpen}
                              style={{
                                marginBottom: "25px",
                                marginLeft: "100px",
                              }}
                              value={
                                values.Time
                                  ? moment(values.Time, "HH:mm")
                                  : null
                              }
                              onChange={onChangeTime}
                              format="HH:mm"
                              renderExtraFooter={() => (
                                <Button
                                  size="small"
                                  type="primary"
                                  onClick={() => setOpen(false)}
                                >
                                  OK
                                </Button>
                              )}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <label style={{ fontWeight: "bold" }}>Guest number</label>
                          <div style={{ marginLeft: "40px", width: "20px" }}>
                            <InputNumber
                              type="num"
                              name="NumberOfGuest"
                              placeholder="Enter number of guest"
                              value={values.NumberOfGuest}
                              onChange={(value) =>
                                handleValue("NumberOfGuest", value)
                              }
                            />
                          </div>
                        </div>
                        <div></div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <label style={{ fontWeight: "bold" }}>Phone number</label>
                          <div style={{ marginLeft: "40px", width: "0px" }}>
                            <InputNumber
                              type="tel"
                              name="PhoneNumber"
                              placeholder="Enter phone number"
                              value={values.PhoneNumber}
                              onChange={(value) =>
                                handleValue("PhoneNumber", value)
                              }
                            />
                          </div>
                        </div>
                        {isModalVisible && (
                          <div style={{ display: "flex", marginTop: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>
                              Select Type
                            </label>
                            <Radio.Group
                              name="Selection"
                              style={{ marginLeft: "35px" }}
                              value={values.Selection}
                              onChange={(e) =>
                                handleValue("Selection", e.target.value)
                              }
                            >
                              Selection
                              <Radio value="Regular">Regular</Radio>
                              <Radio value="VIp">VIP</Radio>
                            </Radio.Group>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </Modal>
            </Form>
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
              </Card>{" "}
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

export default TableManagementSystem;
