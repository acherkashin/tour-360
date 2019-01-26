import React, { Component } from "react";
import client from "./client";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    data: [],
    tourName: '',
    places: [],
  };

  componentDidMount() {
    this.getAllPlaces();
  }

  componentWillUnmount() {

  }

  getAllPlaces = () => {
    client.get("/api/place/get")
      .then(res => this.setState({ places: res.data.data }));
  };

  create = name => {
    client.post("/api/place/create", {
      name
    }).then(this.getAllPlaces);
  };

  deleteFromDB = id => {
    client.delete("/api/place/delete", {
      data: {
        id
      }
    }).then(this.getAllPlaces);
  };

  handleChange(event) {
    this.setState({ tourName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.create(this.state.tourName);
  }

  render() {
    const places = this.state.places;

    return (
      <div>
        <ul>
          {places.map(place => <li key={place._id}>{place.name}</li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
          <input type="text" value={this.state.tourName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;