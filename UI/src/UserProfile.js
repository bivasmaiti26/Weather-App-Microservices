import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Button, Table } from "react-bootstrap";

class userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
    contact: "",
    creditscore: "",
    income : "",
      editable: "readonly"
    };
  }
  handleCreditChange = event => {
    this.setState({
       
            creditscore: event.target.value
 
    });
  };
  handleContactChange = event => {
    this.setState({
       
            contact: event.target.value
 
    });
  };
  handleIncomeChange = event => {
    this.setState({
       
            income: event.target.value
 
    });
  };

  handleEdit = () => {
      this.setState({
          editable : ""
      })
  }
  handleUpdate = () => {
      alert('hi');
  }
  getTransactions = () => {
    let rdata = {
      email: localStorage.getItem("currentUser")
    };
    axios
      .post("http://127.0.0.1:5000/getPersonalData", rdata)
      .then(response => {
        debugger;
        this.setState({
          firstname: response.data['firstname'],
          lastname : response.data['lastname'],
          contact:response.data['contact'],
          creditscore:response.data['creditscore'],
          income:response.data['income']
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  updateUser = () => {
      debugger;
    let rdata = {
      email: localStorage.getItem("currentUser"),
      contact:this.state.contact,
      creditscore:this.state.creditscore,
      income:this.state.income
    };
    axios
      .post("http://127.0.0.1:5000/updateUserProfile", rdata)
      .then(response => {
        debugger;
        this.setState({
          firstname: response.data['firstname'],
          lastname : response.data['lastname'],
          contact:response.data['contact'],
          creditscore:response.data['creditscore'],
          income:response.data['income'],
          editable: "readonly"
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
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
                  <td>Firstname</td><td><input value = {this.state.firstname} readOnly= {this.state.editable} type = "text  "/>  </td>
                  </tr><tr>
                  <td>Lastname</td><td>
                  <input value = {this.state.lastname} readOnly= {this.state.editable} type = "text  " />
                  </td>
                  </tr><tr>
                  <td>Contact</td><td>
                  <input value = {this.state.contact} readOnly= {this.state.editable} type = "text  " onChange = {this.handleContactChange}/>
                  </td>
                  </tr><tr>
                  <td>Creditscore</td><td>
                  <input value = {this.state.creditscore} readOnly= {this.state.editable} type = "text  " onChange = {this.handleCreditChange}/>
                  </td>
                  </tr><tr>
                  <td>Income</td><td>
                  <input value = {this.state.income} readOnly= {this.state.editable} type = "text  " onChange = {this.handleIncomeChange}/>
                  </td>
                  </tr>
                  
                
              </Table>
              <Button onClick = {this.handleEdit}>Edit</Button> <Button onClick = {this.updateUser}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default userprofile;
