import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";


 class Movie extends React.Component {
    render() {
      return (
        
          <div>
             <img
            className="d-block w-100"
            src={this.props.poster}
            alt={this.props.title}
          />
          <Carousel.Caption>
            <h3>{this.props.title}</h3>
          </Carousel.Caption>
          </div>
        
      );
    }
  }
  
  export default Movie;