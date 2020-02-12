import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Sidebar from './Sidebar'
import Search from './Search'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withdraw: 0 ,
      balance: 0,
      credilimit:0 ,      
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    return axios({
      method: "post",
      url: "http://127.0.0.1:5000/ getData",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {'email':localStorage.getItem('currentUser')}
    })
      .then(response => {
        this.setState({withdraw: response.data['withdraw']})
        this.setState({balance: response.data['balance']})
        this.setState({credilimit:response.data['creditlimit'] })
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
      return(
          <>
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'"/>
            <div className="d-flex" id="wrapper">
            <Sidebar/>
            <div id="page-content-wrapper">
            
            </div>
            <Search/>
            </div>        
 </>
      );
    } 
}

export default Dashboard;