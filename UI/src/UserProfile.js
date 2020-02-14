import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Button, Table } from "react-bootstrap";

class userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      is_admin: "",
      registered_on: "",
      editable: "readonly"
    };
  }
  
  handleEdit = () => {
      this.setState({
          editable : ""
      })
  }
  
  getTransactions = () => {
    let rdata = {
      email: localStorage.getItem("currentUser")
    };
    axios
      .get("http://localhost:8000/user_details", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        },
        rdata
    })
      .then(response => {
        this.setState({
          username: response.data['username'],
          email : response.data['email'],
          is_admin: response.data['is_admin'],
          registered_on: response.data['registered_on']
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

componentDidMount() {
    this.getTransactions();
  }
  render() {
    
    return (
      <div class="d-flex" id="wrapper">
        <Sidebar />
        <div className="container py-5">
          <div className="row">
            <h2>Your Profile</h2>
            <div className="col-md-12">
              <Table striped bordered hover size="sm">
                <tr>
                  <td>Username</td><td><input value = {this.state.username} readOnly= {this.state.editable} type = "text  "/>  </td>
                  </tr><tr>
                  <td>Email</td><td>
                  <input value = {this.state.email} readOnly= {this.state.email} type = "text  " />
                  </td>
                  </tr><tr>
                  <td>Admin</td><td>
                  <input value = {this.state.is_admin} readOnly= {this.state.is_admin} type = "text  " onChange = {this.handleContactChange}/>
                  </td>
                  </tr><tr>
                  <td>Registered on</td><td>
                  <input value = {this.state.registered_on} readOnly= {this.state.registered_on} type = "text  " onChange = {this.handleCreditChange}/>
                  </td>
                  </tr>
                  
                
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default userprofile;
