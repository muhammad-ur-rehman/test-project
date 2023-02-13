import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const EditSpot = () => {
  const [spot, setSpot] = useState("");
  const [newSpot, setNewSpot] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (spot === "") setSpot(location.state.spot);
    setNewSpot(location.state.spot);
  }, [spot, location]);

  const updateSpot = (id) => {
    if (id !== undefined) {
      axios
        .put(`/api/v1/spots/${id}`, { spot: newSpot })
        .then(() => {
          navigate(`/viewSpot`, { state: { spot: newSpot } });
        })
        .catch((error) => console.log(error));
    }
  };

  const onAmountChange = (a) => {
    const amount = a;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setNewSpot({
        ...newSpot,
        price: amount,
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Edit Spot</h1>
      </div>
      <hr></hr>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newSpot.title || ""}
            onChange={(e) => {
              setNewSpot({
                ...newSpot,
                title: e.target.value,
              });
            }}
          />
        </label>
        <br></br>

        <label>
          Description:
          <textarea
            type="textArea"
            name="description"
            value={newSpot.description || ""}
            onChange={(e) => {
              setNewSpot({
                ...newSpot,
                description: e.target.value,
              });
            }}
          />
        </label>
        <br></br>

        <label>
          Price:
          <input
            type="text"
            name="price"
            value={newSpot.price || ""}
            onChange={(e) => {
              onAmountChange(e.target.value);
            }}
          />
        </label>
        <br></br>

        <input type="file" name="image" />
        <button
          type="button"
          className="button"
          onClick={() => updateSpot(spot.id)}
        >
          Update
        </button>
      </form>
      <br></br>

      {/* <div className="grid-container">
        <div className="grid-item" spot={spot} key={spot.id}>
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
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
      <button
        type="button"
        className="button"
        onClick={() => updateSpot(spot.id)}
      >
        Update
      </button> */}
    </div>
  );
};
