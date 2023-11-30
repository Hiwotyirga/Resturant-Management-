import React, { useState, useEffect } from "react";
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal, Button, Input, theme } from "antd";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, TimePicker, DatePicker, Select, message } from "antd";
import type { DatePickerProps } from "antd";
import moment from "moment";
// import "./CircularTable.css";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const TableManagementSystem: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [num, setNum] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [guest, setGuest] = useState(0);
  const [reservation, setReservation] = useState("");
  // const [num, setNum] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [inputarry, setInputarrey] = useState([]);
  const [input, setInput] = useState({
    time: ["", ""],
    date: null,
    guestss: "",
    phone: "",
    number: "",
  });

  const [tables, setTables] = useState([
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
  ]);
  const [floors, setFloor] = useState([
    "Regular",
    "VIP",
  ]);
  // const [reservedFloor, setReservedFloor] = useState([]);
  // const handleFloorSelect = (floor) => {
  //   const updatedFloors = floors.filter((t) => t !== floor);
  //   if (updatedFloors.length === floors.length) {
  //     message.error("No data available.");
  //   } else {
  //     setReservedFloor([...reservedTables, floor]);
  //     setFloor(updatedFloors);
  //   }

  //   setFloor(updatedFloors);
  // };

  const [reservedTables, setReservedTables] = useState([]);
  const handleTableSelect = (table) => {
    const updatedTables = tables.filter((t) => t !== table);
    if (updatedTables.length === tables.length) {
      message.error("No data available.");
    } else {
      setReservedTables([...reservedTables, table]);
      setTables(updatedTables);
    }

    setTables(updatedTables);
  };

  const { Option } = Select;
  const onChange = (e, field) => {
    const value = field === "guest" ? parseInt(e.target.value) : e.target.value;
    setInput({ ...input, [field]: value });
  };

  const { time, date, guestss, phone, number } = input;
  const onChangeTime = (time, timeString) => {
    setInput({
      ...input,
      time: timeString,
    });
  };

  const onChange2 = () => {
    setInputarrey([...inputarry, { time, date, guestss, phone, number }]);
    console.log(inputarry);
    console.log(input);
    setInput({ time: "", date: "", guestss: "", phone: "", number: "" });
  };

  const onChange3 = (date, dateString, field) => {
    setInput({ ...input, [field]: date });
  };

  const AddGuests = () => {
    setGuest((prevGuest) => {
      const newGuest = prevGuest + 1;
      setInput((prevInput) => ({ ...prevInput, guestss: newGuest.toString() }));
      return newGuest;
    });
  };

  const MinusGuests = () => {
    if (guest > 0) {
      setGuest((prevGuest) => {
        const newGuest = prevGuest - 1;
        setInput((prevInput) => ({
          ...prevInput,
          guestss: newGuest.toString(),
        }));
        return newGuest;
      });
    }
  };

  const add = () => setNum(num + 1);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [displayedInfo, setDisplayedInfo] = useState([]);
  const handleOk = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
    setNum((prevNum) => prevNum + 1);

    const newInfo = {
      time: input.time,
      date: input.date,
      guestss: input.guestss,
      phone: input.phone,
      selectedTable: reservedTables,
      // selectedFloor: reservedFloor,
      number: input.number,
    };

    setDisplayedInfo([...displayedInfo, newInfo]);
    setInput({ time: "", date: null, guestss: "", phone: "", number: "" });
    setReservedTables([]);
    // setReservedFloor([]);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (event, index) => {
    const { field, value } = event.target;
    const onCancelValue = [...displayedInfo];
    setDisplayedInfo(onCancelValue);
  };

  const handleDateChange = (date, dateString) => {
    onChange(date, dateString);
  };

  const [currentDate, setCurrentDate] = useState(moment());

  const decreaseDate = () => {
    setCurrentDate(currentDate.clone().subtract(1, "days"));
  };

  const increaseDate = () => {
    setCurrentDate(currentDate.clone().add(1, "days"));
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={350} // Set the default width when expanded
        collapsedWidth={50}
        style={{ height: "1000px" }}
      >
        <button
          style={{ borderRadius: "5px", margin: "10px", marginLeft: "130px" }}
        >
          Reservation
        </button>
        <div className="demo-logo-vertical" />
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ marginBottom: 16, width: "250px", marginLeft: "40px" }}
        />
        <div
          style={{
            color: "blue",
            display: "flex",
          }}
        >
          <div style={{ margin: "10px 0px 0 40px", fontSize: "20px" }}>
            Seated
          </div>

          <div style={{ marginLeft: "230px" }}>
            <UserOutlined /> {num}
          </div>
        </div>
        <div>
          <div
            style={{
              flexDirection: "row",
            }}
          >
            <div>
              <ul
                style={{
                  listStyle: "none",
                  color: "white",
                  // margin: "0 0 0 0 ",
                }}
              >
                {displayedInfo?.map((info, indx) => {
                  console.log(info.guestss);
                  return (
                    <li key={indx}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            backgroundColor: "black",
                          }}
                        >
                          <div
                            style={{
                              flexDirection: "column",
                              fontWeight: "35px",
                              margin: "20px",
                            }}
                          >
                            <div>
                              <span>{info.time[0]}&nbsp;&nbsp;</span>
                            </div>
                            <div>
                              <span>-{info.time[1]}</span>
                            </div>
                          </div>
                        </div>
                        <div></div>
                        <div style={{ flexDirection: "column" }}>
                          <div style={{ margin: "5px" }}></div>
                          <div style={{ margin: "5px" }}>
                            <h6>Jermi paul</h6>
                          </div>
                          <span style={{ margin: "5px" }}>{info.phone}</span>
                          <div style={{ margin: "5px" }}>
                            Guests {info.guestss}
                          </div>
                        </div>

                        <div style={{ margin: "0px 10px 0px 50px" }}>
                          <div
                            style={{
                              marginLeft: "10px",
                              border: "1px solid white",
                            }}
                          >
                            <div style={{ display: "flex" }}></div>
                            <span>
                              {/* {info.selectedTable?.join(", ") || "N/A"} */}
                              {info.selectedFloor?.join(", ") || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Space>
            <Button onClick={decreaseDate} icon={<LeftOutlined />} />
            <span>{currentDate.format("ddd, MMM D")}</span>
            <Button onClick={increaseDate} icon={<RightOutlined />} />
          </Space>

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
          <Modal
            title="New Reservation"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={850}
            onChange={onChange2}
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
                  width: "1000px",
                  // backgroundColor: "grey",
                }}
              >
                <div>
                  <div style={{ margin: "23px" }}>Reservation Details</div>
                  <div>
                    <div style={{ display: "flex" }}>
                      Date
                      <Space
                        direction="vertical"
                        style={{
                          marginBottom: "25px",
                          marginLeft: "100px",
                          // width: "1000px",
                        }}
                      >
                        <DatePicker
                          value={input.date}
                          onChange={(date, dateString) =>
                            onChange3(date, dateString, "date")
                          }
                        />
                      </Space>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "25px" }}>
                    <div>Time</div>

                    <Space direction="vertical" style={{ marginLeft: "100px" }}>
                      <TimePicker.RangePicker
                        value={[
                          input.time[0] ? moment(input.time[0], "HH:mm") : null,
                          input.time[1] ? moment(input.time[1], "HH:mm") : null,
                        ]}
                        onChange={onChangeTime}
                        status="warning"
                      />
                    </Space>
                  </div>
                  <div>
                    <div
                      style={{ display: "flex" }}
                      onChange={(e) => onChange(e, "guestss")}
                      value={input.guestss}
                    >
                      Guests
                      <div style={{ marginLeft: "80px", marginRight: "20px" }}>
                        {guest}
                      </div>
                      <div style={{ marginLeft: "100px", display: "flex" }}>
                        <div>
                          <LeftOutlined onClick={AddGuests} />
                        </div>
                        <RightOutlined onClick={MinusGuests} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    Phone Number
                    <div style={{ marginLeft: "40px", width: "0px" }}>
                      <label htmlFor="phoneInput">
                        <input
                          type="tel"
                          id="phoneInput"
                          placeholder="Enter phone number"
                          value={input.phone} // Change this to input.phone
                          onChange={(e) => onChange(e, "phone")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                style={{
                  width: "1000px",
                  // backgroundColor: "grey",
                }}
              >
                <div>
                  <div style={{ margin: "40px", fontSize: "15px" }}>
                    Table Details
                  </div>
                  <div>
                    {/* <h2>Table List</h2> */}
                    <div>
                      <div>
                        {/* <h2>Table List</h2> */}
                        <div style={{ margin: "10px" }}>
                          <div
                            style={{
                              display: "flex",

                              flexDirection: "row",
                              // margin: "10px",
                            }}
                          >
                            <Select
                              style={{ width: "100px" }}
                              placeholder=" table number"
                              onSelect={handleTableSelect}
                              style={{ margin: "0 10px 10px 10px" }}
                            >
                              {tables.map((table) => (
                                <Option key={table} value={table}>
                                  {table}
                                </Option>
                              ))}
                            </Select>

                            {/* <div style={{ margin: "10px" }}> */}
                            <Select
                              style={{ width: 100 }}
                              placeholder="Selection"
                              // onSelect={handleFloorSelect}
                              style={{ margin: "0 10px 10px 10px" }}
                            >
                              {floors.map((floor) => (
                                <Option key={floor} value={floor}>
                                  {floor}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Modal>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
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
