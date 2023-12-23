import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Layout, Modal, Button, Input, InputNumber, Form } from "antd";
import { Card, Space, TimePicker, DatePicker, Radio } from "antd";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const TableManagementSystem = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [postAll, setPostAll] = useState([]);
  const [reservationStatus, setReservationStatus] = useState("open");
  const [values, setValues] = useState({
    PhoneNumber: "",
    Date: "",
    Time: "",
    NumberOfGuest: "",
    Selection: "",
  });
  const { id } = useParams();

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
  useEffect(() => {
    const fetchReservationStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/reservation/status"
        );
        const status = response.data.status;
        setReservationStatus(status);
      } catch (error) {
        console.error("Error fetching reservation status: ", error);
      }
    };
    fetchReservationStatus();
  }, []);
  const onSubmit = (values) => {
    setIsModalVisible(false);
    if (reservationStatus === "open") {
      axios
        .post(`http://localhost:9000/reservation?userId=${id}`, values, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else if (response.data.reservationExpired) {
            alert("Reservation has expired");
          } else {
            axios
              .get("http://localhost:9000/reservation/userValidate-count")
              .then((res) => {
                setCount(res.data);
                Swal.fire("Reservation", "You did it");
              });
          }
        });
    } else {
      Swal.fire(
        "Reservation system is closed",
        "Unable to make a reservation at this time"
      );
      return;
    }
  };

  return (
    <Layout>
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
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
            <Form initialValues={values}>
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
                          <label style={{ fontWeight: "bold" }}>
                            Guest number
                          </label>
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
                          <label style={{ fontWeight: "bold" }}>
                            Phone number
                          </label>
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
          </div>
        </Header>
      </Layout>
    </Layout>
  );
};

export default TableManagementSystem;
