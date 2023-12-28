import axios from "axios";
import React, { useEffect, useState } from "react";
import BeaverageDetial from "./BeaverageDetial";

const Beaverage = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/menu/beaverage").then((res) => {
      setList(res.data);
    });
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="col-12 text-center my-3 fw-bold">Our Beaverage Menu</h1>
      <BeaverageDetial />
      <div className="row justify-content-center">
        {list.map((Val) => {
          return (
            <div
              className="col-md-4 col-sm-6 card my-3 py-3 border-0"
              key={Val.id}
            >
              <div className="card-img-top text-center">
                <img src={Val.postrer} alt={Val.name} className="photo w-75" />
              </div>
              <div className="card-body">
                <div className="card-title fw-bold fs-4">
                  <h5 className="card-title fw-bold fs-4">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{Val.name}</div>
                      <div style={{ marginLeft: "30px" }}>${Val.price}</div>
                    </div>

                    {/* &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp; */}
                  </h5>
                  <p>
                    <div style={{ margin: "20px" }}>{Val.Ingredients}</div>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center"></div>
    </div>
  );
};

export default Beaverage;
