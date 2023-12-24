import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditTable = () => {
  const [newTable, setNewTable] = useState({
    TableNumber: "",
    indoor: "indoor",
    SeatCapacity: 0,
    VIP: "Regular",
    Note: "",
  });
  const { id } = useParams();
  const history = useNavigate();
  const haddleSubmit = () => { 
    axios
      .put(`http://localhost:9000/tablemanage/update/${id}`, newTable)
      .then((res) => {
        // console.log(res.data);
        setNewTable(res.data);

        Swal.fire("Edit Table", "success", "success");
        history("/staff");
      })
      .catch((error) => {
        console.error("Error editing table:", error);

        Swal.fire("Edit Table", "error", "error");
      });
  };

  return (
    <div className="con">
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Table Number</label>
          <input
            name="TableNumber"
            value={newTable.TableNumber}
            onChange={(event) =>
              setNewTable({ ...newTable, TableNumber: event.target.value })
            }
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Table Number"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Indoor</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            name="indoor"
            value={newTable.indoor}
            onChange={(event) =>
              setNewTable({ ...newTable, indoor: event.target.value })
            }
          >
            <option value="indoor">indoor</option>
            <option value="outdoor">outdoor</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Seat Capacity</label>
          <input
            // type="email"
            name="SeatCapacity"
            value={newTable.SeatCapacity}
            onChange={(event) =>
              setNewTable({ ...newTable, SeatCapacity: event.target.value })
            }
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Seat Capacity"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">VIP</label>
          <select
            // multiple
            class="form-control"
            id="exampleFormControlSelect2"
            name="VIP"
            value={newTable.VIP}
            onChange={(event) =>
              setNewTable({ ...newTable, VIP: event.target.value })
            }
          >
            <option value="vip">vip</option>
            <option value="regular">regular</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Note</label>
          <textarea
            name="Note"
            value={newTable.Note}
            onChange={(event) =>
              setNewTable({ ...newTable, Note: event.target.value })
            }
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <Button type="button" className="btn bg-primary" onClick={haddleSubmit}>
          Edit Table
        </Button>
      </form>
    </div>
  );
};

export default EditTable;
