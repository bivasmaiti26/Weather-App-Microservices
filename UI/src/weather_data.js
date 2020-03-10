import React, { Component } from "react";
import { set } from "local-storage";

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: ""     
    };  
    this.setdata = this.setdata.bind(this);
}

  setdata = (evt) => {
    this.setState({weatherData:JSON.parse(evt.data)}) 
  }

  componentDidMount()
  {
    var myWebSocket = new WebSocket("ws://0.0.0.0:9090");
            
        //this.setState({weatherData:evt.data})
    myWebSocket.onmessage = this.setdata;
  }


  render() {
      if(this.state.weatherData!=="")
      {
          const tableData = this.state.weatherData.map((jsonData) =>
            <tr>
                <td style={{width:230}}>{jsonData.startTime}</td>
                <td style={{width:230}}>{jsonData.endTime}</td>
                <td style={{width:30}}>{jsonData.temperature}</td>
                <td style={{width:50}}>{jsonData.temperatureUnit}</td>
                <td style={{width:70}}>{jsonData.windSpeed}</td>
                <td style={{width:30}}>{jsonData.windDirection}</td>
                <td style={{width:230}}>{jsonData.shortForecast}</td>
            </tr>
          );
      return(
          <>
          <table>
          {tableData}
          </table> 
    </>
      );
      }
      else
      {
        return(
            <>
            
                    
      </>
        );   
      }
    } 
}

export default WeatherData;