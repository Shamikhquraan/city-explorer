import React from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form,Card} from "react-bootstrap/";
import Image from "react-bootstrap/Image";
import Weather from "./components/Weather";
import Movie from "./components/Movie";
// import { wait } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      cityDataBack: {},
      searchCity: "",
      showData: false,
      objCity: {},
      movObmovie: [],
    };
  }

  getLocation = async (e) => {
    console.log("inside get locatiosn function");
    e.preventDefault();

    await this.setState({
      searchCity: e.target.city.value,
    });
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;
    let resultData = await axios.get(locURL);
    await this.setState({
      cityData: resultData.data[0],

      showData: true,
    });

    try {
      let bacURL =
        await `${process.env.REACT_APP_SERVER_LINK}/Weather?searchQuery=${this.state.searchCity}`;
      let resultDataBack = await axios.get(bacURL);

      await this.setState({
        cityDataBack: resultDataBack.data[0],

        showData: true,
      });
    } catch (error) {
      alert("API sending something wrong");
      console.log("API sending something wrong", error);
    }

    let placeURL3 = await `${process.env.REACT_APP_SERVER_LINK}/movie?cityName=${this.state.searchCity}`;

    let moviResult = await axios.get(placeURL3);

    let proDataForSplice = moviResult.data;
    for (let index = 0; index < proDataForSplice.length; index++) {
      console.log("shamikh", proDataForSplice[index]);
      if (
        proDataForSplice[index].poster ===
          "https://image.tmdb.org/t/p/original//cJy32F0ZCgKrLeamdx4IrAWXJFa.jpg" ||
        proDataForSplice[index].poster ===
          "https://image.tmdb.org/t/p/original//1NUOprbP7LLfKPArLJY7wziUiHT.jpg" ||
        proDataForSplice[index].poster ===
          "https://image.tmdb.org/t/p/original//6tn0pNVvTfFTREKOfixksU8QCSV.jpg"
      ) {
        //  THIS CODE IS TO CLEAN THE MOVIE LIST FROM ADULT CONTENT, MY GODNESS

        proDataForSplice.splice(index, 1);
      }
    }
    console.dir(moviResult.data);

    await this.setState({
      movObmovie: proDataForSplice,

      showData: true,
    });

    console.log("dsaasas", this.state.Obmovie);
  };

  render() {
    return (
      <div className="containerIMg">
        <Form className="ImageClass" onSubmit={this.getLocation}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City Explore ✔ </Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Type here ...."
            />
          </Form.Group>
          <button type="submit">Explore!</button>
        </Form>

        <div>
          {this.state.showData && (
            <Weather
              name={this.state.searchCity}
              Lat={this.state.cityData.lat}
              Lon={this.state.cityData.lon}
              date={this.state.cityDataBack.date}
              description={this.state.cityDataBack.description}
            />
          )}
        </div>
        <div className="imgAPI">
          {this.state.showData && (
            <Image
              className="imgClass"
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11.5`}
            />
          )}
        </div>

        <div className="tab2">
          {this.state.showData &&
            this.state.movObmovie.map((item, i) => {
              return (
                
                <Card style={{ width: "18rem" }}>
                  <Movie
                    key={i}
                    title=''
                    poster={item.poster}
                    state={this.state}
                  />
                  <Card.Body>
          <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </div>
    );
  }
}
export default App;
