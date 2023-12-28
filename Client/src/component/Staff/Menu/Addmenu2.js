import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Addmenu2 = () => {
  const [newMenu, setNewMenu] = useState({
    categorie: "Food",
    Ingredients: "",
    Group: "",
    name: "",
    postrer: "",
    price: "",
  });
  const hist = useNavigate();
  const haddleSubmit = () => {
    axios.post("http://localhost:9000/menu", newMenu).then((res) => {
      setNewMenu(res.data);
      // console.log(res.data);
      hist("/staff");
    });
    Swal.fire("Add Menu", "success");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)), url('https://tse3.mm.bing.net/th?id=OIP.oRrP8UuKNXMvqHyrA7uJfAHaEK&pid=Api&P=0&h=220')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Categorie</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            name="indoor"
            value={newMenu.categorie}
            onChange={(event) =>
              setNewMenu({ ...newMenu, categorie: event.target.value })
            }
          >
            <option value="Food">Food</option>
            <option value="Beaverage">Beaverage</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Ingredients</label>
          <input
            name="TableNumber"
            value={newMenu.Ingredients}
            onChange={(event) =>
              setNewMenu({ ...newMenu, Ingredients: event.target.value })
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Table Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Group</label>
          <input
            // type="email"
            name="SeatCapacity"
            value={newMenu.Group}
            onChange={(event) =>
              setNewMenu({ ...newMenu, Group: event.target.value })
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Seat Capacity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">name</label>
          <input
            // type="email"
            name="SeatCapacity"
            value={newMenu.name}
            onChange={(event) =>
              setNewMenu({ ...newMenu, name: event.target.value })
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Seat Capacity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Poster</label>
          <input
            // type="email"
            name="SeatCapacity"
            value={newMenu.postrer}
            onChange={(event) =>
              setNewMenu({ ...newMenu, postrer: event.target.value })
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Seat Capacity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Price</label>
          <input
            // type="email"
            name="SeatCapacity"
            value={newMenu.price}
            onChange={(event) =>
              setNewMenu({ ...newMenu, price: event.target.value })
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Seat Capacity"
          />
        </div>

        {/* <Link to="/staff"> */}
        <Button
          type="button"
          className="btn bg-primary"
          onClick={haddleSubmit}
          style={{ margin: "20px" }}
        >
          Submit
        </Button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default Addmenu2;
