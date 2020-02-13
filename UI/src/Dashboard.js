import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Sidebar from './Sidebar'
import Search from './Search'
import WeatherData from "./weather_data";
import { Table } from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {      
    };
  }

  render() {
      return(
          <>
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'"/>
            <div className="d-flex">
            <Sidebar/>
            <div style={{display:Table}}>
            <div>
            <Search/>
            </div>
            <div style={{paddingLeft:50}}>
            <WeatherData/>
            </div>
            </div>
            </div>        
 </>
      );
    } 
}

export default Dashboard;