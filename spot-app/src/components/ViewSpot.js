import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";

export const ViewSpot = () => {
  const [spot, setSpot] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (spot === "") setSpot(location.state.spot);
    getReviews(location.state.spot.id);
  }, [spot, location]);

  const getReviews = (id) => {
    axios
      .get(`/api/v1/spots/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.log(error));
  };

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

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const createReview = (e) => {
    if (e.key === "Enter") {
      axios
        .post(`/api/v1/spots/${spot.id}/reviews`, {
          review: { description: e.target.value },
        })
        .then((response) => {
          getReviews(location.state.spot.id);
          setInputValue("");
        })
        .catch((error) => console.log(error));
    }
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
          <br></br>

          <h2>Reviews</h2>
          <div>
            {reviews?.map((review) => {
              return (
                <Link
                  to={`/EditReview/${review.id}`}
                  className="simple-text"
                  state={{ review, spot }}
                >
                  <ul className="task" review={review} key={review?.id}>
                    <label className="taskLabel">{review?.description}</label>
                  </ul>
                </Link>
              );
            })}
          </div>
          <input
            className="taskInput"
            type="text"
            placeholder="Add a review"
            maxLength="50"
            onKeyPress={(e) => createReview(e)}
            value={inputValue}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
};
