import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NewSpot = () => {
  const [spot, setSpot] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSpot({
      title: "",
      description: "",
      price: 0.0,
    });
  }, []);

  const createSpot = (flag) => {
    if (flag) {
      axios
        .post("/api/v1/spots", { spot: spot })
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  const onAmountChange = (a) => {
    const amount = a;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setSpot({
        ...spot,
        price: amount,
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Add New Spot</h1>
      </div>
      <hr></hr>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={spot.title || ""}
            onChange={(e) => {
              setSpot({
                ...spot,
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
            value={spot.description || ""}
            onChange={(e) => {
              setSpot({
                ...spot,
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
            value={spot.price || "0.0"}
            onChange={(e) => {
              onAmountChange(e.target.value);
            }}
          />
        </label>
        <br></br>

        {/* <input type="file" name="image" /> */}
        <button
          type="button"
          className="button"
          onClick={() => createSpot(true)}
        >
          Create
        </button>
      </form>
    </div>
  );
};
