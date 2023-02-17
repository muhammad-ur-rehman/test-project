import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SpotForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [image, setImage] = useState(null);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handlePriceChange(event) {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setPrice(amount);
    }
  }

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    axios
      .post("/api/v1/spots", formData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Add New Spot</h1>
      </div>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <br></br>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <br></br>
        <div>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={price || "0.0"}
              onChange={handlePriceChange}
            />
          </label>
        </div>
        <br></br>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <br></br>
        <button type="submit">Add Spot</button>
      </form>
    </div>
  );
}

export default SpotForm;
