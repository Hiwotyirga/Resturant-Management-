import { Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BeaverageDetial = () => {
  const [list, setList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/menu/beaverage").then((res) => {
      setList(res.data);
    });
  }, []);
  const group = [...new Set(list.map((Item) => Item.Group))];
  const handleChange = (Group) => {
    setSelectedGroup(Group);
    const filtered = list.filter((Item) => Item.Group === Group);
    setFilteredItem(filtered);
  };
  const resetItems = () => {
    setFilteredItem(list);
  };

  return (
    // <div className="col-md-4 col-sm-6 mb-3 mt-4">
    //   {group.map((Group) => (
    //     <Button
    //       className="btn btn-dark text-white fw-bold me-4"
    //       key={Group}
    //       onClick={() => handleChange(Group)}
    //     >
    //       {Group}
    //     </Button>
    //   ))}
    //   <div>
    //     {selectedGroup && (
    //       <div>
    //         <div className="row justify-content-center mt-4 me-4">
    //           {filteredItem.map((item) => (
    //             <div className="col-md-4 col-sm-6 card mb-3" key={item.id}>
    //               <div className="card-img-top text-center">
    //                 <img
    //                   src={item.postrer}
    //                   alt={item.name}
    //                   className="photo w-75"
    //                 />
    //               </div>
    //               <div className="card-body">
    //                 <h5 className="card-title fw-bold fs-4">
    //                   {item.name} &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;$
    //                   {item.price}
    //                 </h5>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        {group.map((Group, id) => (
          <button
            className="btn btn-dark text-white me-2 fw-bold"
            key={id}
            onClick={() => handleChange(Group)}
          >
            {Group}
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
        {filteredItem.map((item) => (
          <div className="col-md-4 col-sm-6 card mb-3" key={item.id}>
            <div className="card-img-top text-center">
              <img src={item.postrer} alt={item.name} className="photo w-75" />
            </div>
            <div className="card-body">
              <h5 className="card-title fw-bold fs-4">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{item.name}</div>
                  <div style={{ marginLeft: "30px" }}>${item.price}</div>
                </div>

                {/* &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp; */}
              </h5>
              <p>
                <div style={{ margin: "20px" }}>{item.Ingredients}</div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeaverageDetial;

