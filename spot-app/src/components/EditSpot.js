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

        <button
          type="button"
          className="button"
          onClick={() => updateSpot(spot.id)}
        >
          Update
        </button>
      </form>
      <br></br>
    </div>
  );
};
