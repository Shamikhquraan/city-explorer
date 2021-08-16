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


     await this.setState({
      cityData: resultData.data[0],
      showData: true
    })


  }

  render() {
    return (
     
        <div className="containerIMg">
        <Form className="ImageClass" onSubmit={this.getLocation}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>City Explore ✔ </Form.Label>
    <Form.Control type="text" name="city" placeholder="Type here ...." />
  </Form.Group>
  <button type="submit" class="btn btn-primary">Explore!</button>
</Form>

          <div>
          {this.state.showData && <p>({this.state.searchCity} Latt:{this.state.cityData.lat} /Lon:{this.state.cityData.lon} )</p>
          }

         </div>
         <div className="imgAPI">
{this.state.showData && (

<Image className="imgClass" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11.5`} /> 
)}

</div>
</div>    
    )
  }
}
export default App;
