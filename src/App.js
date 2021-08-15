import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: '',
      showData: false
    }
  }

  getLocation = async (e) => {
    console.log('inside get location function')
    e.preventDefault();

    await this.setState({
      searchCity: e.target.city.value
    })

    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;

    let resultData = await axios.get(locURL);


    this.setState({
      cityData: resultData.data[0],
      showData: true
    })


  }

  render() {
    return (
     
        <>
          <h2>City Explorer</h2>
          <form onSubmit={this.getLocation}>
            <input type='text' placeholder='Enter city' name='city' />
            <button>Explore!</button>

          </form>
          <div>
          {this.state.showData && <p>({this.state.searchCity} Lat:{this.state.cityData.lat} /Lon:{this.state.cityData.lon} )</p>
          }

<div className="img">
{this.state.showData && (

<Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`}  /> 
)}

</div>
         </div>

        
        </>
      
    )
  }
}
export default App;
