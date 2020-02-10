import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Sidebar from './Sidebar'

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


  componentDidMount() {
    this.getData();
  }

  render() {
      return(
          <>
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'"/>
            <div className="d-flex" id="wrapper">
            <Sidebar/>
            <div id="page-content-wrapper">
            <Card style={{height:150, width:300, marginLeft:400, marginTop: 100}}>
                                <li className="list-group-item">Withdraw Amount:    {this.state.withdraw}</li>
                                <li className="list-group-item">Remaining Balance:  {this.state.balance}</li>
                                <li className="list-group-item">Total Credit limit: {this.state.credilimit}</li>
            </Card>
            </div>

            </div>        
 </>
      );
    } 
}

export default Dashboard;