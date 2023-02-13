import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const ViewSpot = () => {
  const [spot, setSpot] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (spot === "") setSpot(location.state.spot);
  }, [spot, location]);

  const deleteSpot = (id) => {
    axios
      .delete(`/api/v1/spots/${id}`)
      .then(() => {
        navigate("/");
        // alert("The Spot is successfuly deleted!");
      })
      .catch((error) => console.log(error));
  };

  const editSpot = (spot) => {
    navigate(`/EditSpot/${spot.id}`, { state: { spot: spot } });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>View Spot</h1>
      </div>
      <hr></hr>

      <button
        type="button"
        className="del-button"
        onClick={() => deleteSpot(spot.id)}
      >
        Delete
      </button>
      <button type="button" className="button" onClick={() => editSpot(spot)}>
        Edit
      </button>
      <div className="grid-container">
        <div className="grid-item" spot={spot} key={spot.id}>
          <img
            src={
              spot.image ||
              "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }
            alt="cover"
            className="w-full rounded-lg"
          />
          <label className="title">{spot.title}</label>
          <p>
            <i>{spot.description || "N/A"}</i>
          </p>
          <p>
            <b>${spot.price || "0.0"} </b>/ hour
          </p>
        </div>
      </div>
    </div>
  );
};
