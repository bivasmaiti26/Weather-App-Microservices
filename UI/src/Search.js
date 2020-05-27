import React, { Component } from "react";
import AlgoliaPlaces from 'algolia-places-react';
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "" 
    };
    this.sendCityData = this.sendCityData.bind(this);
  }

  sendCityData(suggestion) {
    return axios({
        method: "post",
        url: "http://localhost:8000/getWeatherData",
        headers: { "Access-Control-Allow-Origin": "*" ,Authorization: "Bearer " + localStorage.getItem("auth_token")},
        data:suggestion
      })
        .then(response => {
        })
        .catch(err => {
          console.log(err);
        });
  }

  render() {
      return(
          <>
    <div style={{paddingLeft:70, paddingTop:40, height:100}}>
    <AlgoliaPlaces
      placeholder='Write an address here'
      //value={this.state.address}
      style={{width:700}}
      options={{
        appId: 'pl3607CT9IAD',
        apiKey: '4a8c80818980b9e333a2c0e4294ae921',
        language: 'en',
        countries: ['us'],
        type: 'city',
        // Other options from https://community.algolia.com/places/documentation.html#options
      }}
 
      onChange={({ rawAnswer, suggestion, suggestionIndex }) => 
        this.sendCityData(suggestion)}
 
    />  </div>    
 </>
 
      );
    } 
}

export default Search
