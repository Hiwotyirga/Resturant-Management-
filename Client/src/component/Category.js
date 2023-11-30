import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CategoryDetail from "./CategoryDetail";

const Categoriess = () => {
  const [list, setList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const filterItems = (curcat) => {
    const newItems = list.filter((item) => item.categorie === curcat);
    setList(newItems);
    setSelectedCategoryId(curcat);
  };

  const resetItems = () => {
    axios
      .get("http://localhost:3333/categories")
      .then((response) => {
        setList(response.data);
        setSelectedCategoryId(null);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="col-12 text-center my-3 fw-bold">Our Menu</h1>
      <CategoryDetail list={list} />
      <div className="row justify-content-center">
        {list.map((Val) => {
          return (
            <div className="col-md-4 col-sm-6 card my-3 py-3 border-0" key={Val.id}>
              <div className="card-img-top text-center">
                <img src={Val.postrer} alt={Val.name} className="photo w-75" />
              </div>
              <div className="card-body">
                <div className="card-title fw-bold fs-4">
                  {Val.name} &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;
                  {Val.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center">
        {['Burger and Sandwiches', 'Chicken', 'Beef', 'Pasta', 'Ethiopia Dishes', 'Hot Dirink', 'Dirink', 'Pizza'].map((category, id) => (
          <button
            className={`btn btn-dark text-white me-2 fw-bold ${selectedCategoryId === category ? 'active' : ''}`}
            key={id}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        ))}
        <button
          className={`btn btn-dark text-white fw-bold ${selectedCategoryId === null ? 'active' : ''}`}
          onClick={resetItems}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default Categoriess;