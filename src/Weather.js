import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";


class Weather extends React.Component{


render(){


return(



 
    <div>
        <Table striped bordered hover>
          <tbody key={this.props.key}>
            <tr>
            <th>City name: {this.props.name}</th>
            <th>Lat: {this.props.Lat}</th>
            <th>Lon name: {this.props.Lon}</th>
              <th>Date: {this.props.date}</th>
              <th>description: {this.props.description}</th>
            </tr>
          </tbody>
        </Table>
      </div>





)




}


}

export default Weather;