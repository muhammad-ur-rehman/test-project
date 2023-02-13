import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import { Link } from "react-router-dom";

class HomePagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
    };
    this.state = {
      spots: [],
      inputValue: "",
    };
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  getSpots() {
    axios
      .get("/api/v1/spots")
      .then((response) => {
        this.setState({ spots: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getSpots();
  }

  createSpot = (e) => {
    if (e.key === "Enter") {
      axios
        .post("/api/v1/spots", { spot: { title: e.target.value } })
        .then((response) => {
          const spots = update(this.state.spots, {
            $splice: [[0, 0, response.data]],
          });

          this.setState({
            spots: spots,
            inputValue: "",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  updateSpot = (e, id) => {
    axios
      .put(`/api/v1/spots/${id}`, { spot: { title: "updated value" } })
      .then((response) => {
        const spotIndex = this.state.spots.findIndex(
          (x) => x.id === response.data.id
        );

        const spots = update(this.state.spots, {
          [spotIndex]: { $set: response.data },
        });
        this.setState({
          spots: spots,
        });
      })
      .catch((error) => console.log(error));
  };

  deleteSpot = (id) => {
    axios
      .delete(`/api/v1/spots/${id}`)
      .then((response) => {
        const todoIndex = this.state.spots.findIndex((x) => x.id === id);
        const spots = update(this.state.spots, {
          $splice: [[todoIndex, 1]],
        });
        this.setState({
          spots: spots,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="">
        <div className="header">
          <h1>Spots & Reviews</h1>
        </div>
        <hr></hr>
        <Link to="/NewSpot" className="simple-text">
          <button type="button" className="new-button">
            Add New Spot
          </button>
        </Link>
        <div className="grid-container">
          {this.state.spots.map((spot) => {
            return (
              <div className="grid-item" spot={spot} key={spot.id}>
                <Link to="/viewSpot" className="simple-text" state={{ spot }}>
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
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePagesContainer;
