import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";

class SpotsContainer extends Component {
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
      <div>
        <input
          className="taskInput"
          type="text"
          placeholder="Add a spot"
          maxLength="50"
          onKeyPress={this.createSpot}
          value={this.state.inputValue}
          onChange={this.handleChange}
        />

        <div className="listWrapper">
          <ul className="taskList">
            {this.state.spots.map((spot) => {
              return (
                <li className="task" spot={spot} key={spot.id}>
                  <input
                    className="taskCheckbox"
                    type="checkbox"
                    onChange={(e) => this.updateSpot(e, spot.id)}
                  />
                  <label className="taskLabel">{spot.title}</label>
                  <span className="deleteTaskBtn">
                    <span
                      className="deleteTaskBtn"
                      onClick={(e) => this.deleteSpot(spot.id)}
                    >
                      x
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SpotsContainer;
