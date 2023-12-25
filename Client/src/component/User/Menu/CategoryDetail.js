import React, { useState } from "react";

const CategoryDetail = ({ list }) => {
  const [items, setItems] = useState(list);
  const menuItems = [...new Set(list.map((item) => item.Group))];

  const filterItems = (curcat) => {
    const newItems = list.filter((item) => item.Group === curcat);
    setItems(newItems);
  };

  const resetItems = () => {
    setItems(list);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        {menuItems.map((category, id) => (
          <button
            className="btn btn-dark text-white me-2 fw-bold"
            key={id}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        ))}
        <button
          className="btn btn-dark text-white fw-bold"
          onClick={() => resetItems()}
        >
          All
        </button>
      </div>
      <div className="row justify-content-center mt-4">
        {items.map((item) => (
          <div className="col-md-4 col-sm-6 card mb-3" key={item.id}>
            <div className="card-img-top text-center">
              <img src={item.postrer} alt={item.name} className="photo w-75" />
            </div>
            <div className="card-body">
              <h5 className="card-title fw-bold fs-4">
                {item.name} &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;${item.price}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
