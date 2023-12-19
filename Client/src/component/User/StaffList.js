import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Space,
  Modal,
  Form,
  TimePicker,
  DatePicker,
  Radio,
  InputNumber,
  Button,
} from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";

const StaffList = () => {
  const [reservations, setReservations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [postAll, setPostAll] = useState([]);
  const [reservation, setReservation] = useState([]);
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
    axios
      .get(`http://localhost:9000/reservation/user`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, [id]);

  const onSubmit = (values) => {
    const NumberOfGuest = values.NumberOfGuest.toString().trim();

    const PhoneNumber = values.PhoneNumber.toString().trim();

    if (
      values.PhoneNumber === "" ||
      values.Date.trim() === "" ||
      values.Time.trim() === "" ||
      values.Selection.trim() === "" ||
      NumberOfGuest === ""
    ) {
      alert("Please provide valid input for all fields");
      return;
    }
    const numberOfGuest = parseInt(values.NumberOfGuest, 10);

    if (isNaN(numberOfGuest) || numberOfGuest <= 0 || numberOfGuest % 1 !== 0) {
      alert("Please enter a valid positive integer for Number of Guests");
      return;
    }
    if (isNaN(PhoneNumber) || PhoneNumber <= 0 || PhoneNumber % 1 !== 0) {
      alert("Please enter a valid Number of Phone number");
      return;
    }
    setIsModalVisible(false);
    axios
      .put(`http://localhost:9000/reservation/userdata?userId=${id}`, values, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
        data: {
          NumberOfGuest: numberOfGuest,
          PhoneNumber: PhoneNumber,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // console.log(response.data);
          alert("success");
        }
        axios
          .get(`http://localhost:9000/reservation/user`, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            setReservations(response.data);
          });
      });
  };

  const cancelReservation = (reservationId) => {
    axios
      .post(
        "http://localhost:9000/reservation/cancel",
        { reservationId },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then(() => {
        setReservation((prevReservations) => {
          return prevReservations.map((reservation) => {
            if (reservation.id === reservationId) {
              return { ...reservation, Status: "cancel" };
            }
            return reservation;
          });
        });
        alert("Reservation cancel successfully!");
      })
      .catch((error) => {
        console.error("start error:", error);
      });
  };

  return (
    <div>
      <h1>Your Reservations</h1>
      <Row gutter={[16, 16]}>
        {reservations.map((reservation) => (
          <Col key={reservation.id} span={8}>
            <Card
              style={{ backgroundColor: "grey", color: "white" }}
              title={`Reservation on ${reservation.Date} at ${reservation.Time}`}
            >
              <Space direction="vertical">
                <p>Name:{reservation.User.name}</p>
                <p>phone Number: {reservation.PhoneNumber}</p>
                <p>Number of Guests: {reservation.NumberOfGuest}</p>
                <p>Selection: {reservation.Selection}</p>
                <p>Status: {reservation.Status}</p>
              </Space>
              <div style={{ display: "flex", marginLeft: "30px" }}>
                <div>
                  {/* <DeleteOutlined /> */}
                  <button
                    style={{ backgroundColor: "red", color: "black" }}
                    onClick={() => cancelReservation(reservation.id)}
                  >
                    Cancle
                  </button>
                </div>
                <div onClick={showModal}>
                  <EditOutlined />
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
                                  <label style={{ fontWeight: "bold" }}>
                                    Date
                                  </label>
                                  <Space
                                    direction="vertical"
                                    style={{
                                      marginBottom: "25px",
                                      marginLeft: "100px",
                                    }}
                                  >
                                    <DatePicker
                                      name="Date"
                                      value={
                                        values.Date ? moment(values.Date) : null
                                      }
                                      onChange={handleDateChange}
                                      format="YYYY-MM-DD"
                                    />
                                  </Space>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "20px",
                                }}
                              >
                                <div>
                                  <label style={{ fontWeight: "bold" }}>
                                    Time
                                  </label>
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
                              <div
                                style={{ display: "flex", marginTop: "10px" }}
                              >
                                <label style={{ fontWeight: "bold" }}>
                                  Guest number
                                </label>
                                <div
                                  style={{ marginLeft: "40px", width: "20px" }}
                                >
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
                              <div
                                style={{ display: "flex", marginTop: "10px" }}
                              >
                                <label style={{ fontWeight: "bold" }}>
                                  Phone number
                                </label>
                                <div
                                  style={{ marginLeft: "40px", width: "0px" }}
                                >
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
                                <div
                                  style={{ display: "flex", marginTop: "10px" }}
                                >
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
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StaffList;
