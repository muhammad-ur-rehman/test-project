import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const EditReview = () => {
  const [spot, setSpot] = useState("");
  const [review, setReview] = useState("");
  const [newReview, setNewReview] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (spot === "") setSpot(location.state.spot);
    if (review === "") setReview(location.state.review);
    setNewReview(location.state.review);
  }, [spot, review, location]);

  const updateReview = (id) => {
    if (id !== undefined) {
      axios
        .put(`/api/v1/reviews/${id}`, { review: newReview })
        .then(() => {
          navigate(`/viewSpot`, { state: { spot: spot } });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Edit Review</h1>
      </div>
      <hr></hr>
      <form>
        <label>
          Description:<br></br>
          <textarea
            type="textArea"
            name="description"
            value={newReview.description || ""}
            onChange={(e) => {
              setNewReview({
                description: e.target.value,
              });
            }}
          />
        </label>
        <button
          type="button"
          className="button"
          onClick={() => updateReview(review.id)}
        >
          Update
        </button>
      </form>
    </div>
  );
};
