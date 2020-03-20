import React, { Component } from "react";
import { Form, Button, Col} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import localStorage from 'localStorage';
import Dashboard from './Dashboard'

import {ToastsContainer, ToastsStore} from 'react-toasts';

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLogin: false,
        showModal1: false,
        showModal2: false,
        showModal3: false,
        email: "",
        password: "",
        newEmail: "",
        newPassword: "",
        username: "",
        newLastName: "",
        newContact: "",
        creditScore: "",
        income: ""
      };
      this.changeState = this.changeState.bind(this);
      this.changeState2 = this.changeState2.bind(this);
    
      this.sendLoginData = this.sendLoginData.bind(this);
      this.logout = this.logout.bind(this);
      this.sendEmail = this.sendEmail.bind(this);
      this.createNewUser = this.createNewUser.bind(this);
      this.onChange = this.onChange.bind(this);

    }

    handleEmailChange = event => {
      this.setState({
        email: event.target.value
      });
    };

    handlePasswordChange = event => {
      this.setState({
        password: event.target.value
      });
    };

    componentDidMount() {
      //localStorage.setItem("page","Dashboard")
      console.log(localStorage)
    }



    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    changeState() {
      this.setState({
        showModal1: !this.state.showModal1
      })
      this.setState({
        showModal2: false
      })
    }

    changeState2() {
      this.setState({
        showModal2: !this.state.showModal2
      })
      this.setState({
        showModal1: false
      })
    }

    logout() {
      localStorage.setItem("isLogin", "false");
      localStorage.setItem("currentUser","");
      localStorage.removeItem("auth_token");
      this.setState({
        isLogin: false,
        showModal1: false
      })
      ToastsStore.success("Successful Log Out");
          window.location.href="/Home" 

    }

    sendLoginData() {
      var userCreds = {
        username: this.state.username,
        password: this.state.password
      };

      return axios({
          method: 'post',
          url: 'http://149.165.170.68:30008/login',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: userCreds
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === 'Login successful.') {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("currentUser",this.state.username);
            localStorage.setItem("auth_token",response.data.auth_token);
            ToastsStore.success("Successful Log In");
            window.location.reload();
            window.location.href="/Dashboard" 
            
            this.setState({
              isLogin: true
            })
          }

          if (response.data.message === 'User does not exist.') {
            ToastsStore.error("User does not exist.");
          }

          if (response.data.message === 'Incorrect username or password.') {
            ToastsStore.error("Incorrect Credentials. Please Enter Valid Email and Password");
          }
        }).catch(err => {
          console.log(err);
        })
    }

    createNewUser() {

      var newUserData = {
        "email": this.state.newEmail,
        "password": this.state.newPassword,
        "username": this.state.username,
      };

      return axios({
          method: 'post',
          url: 'http://149.165.170.68:30008/register',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: newUserData
        })
        .then((response) => {
          if (response.data.message === 'User successfully registered.') {
            ToastsStore.success("User successfully registered.");
            this.changeState2();
          }
          if (response.data.message === 'User already exists. Please log in.') {
            ToastsStore.error("User already exists. Please log in.");
          }
        }).catch(err => {

        })
    }

    sendEmail(user) {
      return axios({
          method: 'post',
          url: 'http://149.165.170.68:30008/welcomeEmail',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: user
        })
        .then((response) => {

        }).catch(err => {

        })
    }    
   
    render() {
      if(localStorage.getItem("auth_token"))
      {
        return(
        <div>
              <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                  <meta name="description" content />
                  <meta name="author" content />
                  <title>Weather App</title>
                  <link href="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
                  <link href="./vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
                  <link href="./vendor/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css" />
                  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css" />
                  <link href="./css/landing-page.min.css" rel="stylesheet" />
                  <nav className="navbar navbar-light bg-light static-top">
                    <div className="container-fluid">
                      <a className="navbar-brand" href="/home">Weather App</a>
                      <Form>
                      <ul  class="list-inline">
                        <li class="list-inline-item">Welcome</li>
                        <li class="list-inline-item"><Button onClick={this.logout}>Logout</Button></li>
                      </ul>
                      </Form>
                    </div>
                  </nav>
                  <ToastsContainer store={ToastsStore}/>
            </div>
          );
      }
      else{
      return (
            <div>
              <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                  <meta name="description" content />
                  <meta name="author" content />
                  <title>Weather App</title>
                  <link href="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
                  <link href="./vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
                  <link href="./vendor/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css" />
                  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css" />
                  <link href="./css/landing-page.min.css" rel="stylesheet" />
                  <nav className="navbar navbar-light bg-light static-top">
                    <div className="container-fluid">
                      <a className="navbar-brand" href="/home">Weather App</a>
                      <Form>

                      <Button onClick={this.changeState} show={this.state.isLogin}>Login</Button>
                       <Modal style={{zIndex:50000}} show={this.state.showModal1} onHide={this.changeState}>
                       <Form style = {{padding:'20px'}}>
                      <Form.Group controlId="Header">
                          <h1 style={{textAlign:"center"}}>Login</h1>
                      </Form.Group>
                      <Form.Row>
                            <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label style={{fontSize:18}}>Username</Form.Label>
                            <Form.Control placeholder="Username" value={this.state.username} name="username" onChange={this.onChange} />
                            </Form.Group>
                          </Form.Row>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{fontSize:18}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                      </Form.Group>
                      <Button style = {{float:'right'}} variant="primary" type="Button" onClick={this.sendLoginData}>
                        Login
                      </Button>
                    </Form>
                    </Modal>


                      &nbsp;&nbsp;&nbsp;
                      <Button onClick={this.changeState2} show={this.state.isLogin}>Sign Up</Button>
                  <Modal style={{zIndex:50000}} show={this.state.showModal2} onHide={this.changeState2}>
                    <Form style = {{padding:'20px'}}>
                          <Form.Group controlId="Header">
                              <h1 style={{textAlign:"center"}}>Sign Up Here</h1>
                          </Form.Group>
                          
                          <Form.Row>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label style={{fontSize:18}}>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"  value={this.state.newEmail}  name="newEmail" onChange={this.onChange} />
                          </Form.Group>
                          </Form.Row>
                          
                          <Form.Row>
                            <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label style={{fontSize:18}}>Username</Form.Label>
                            <Form.Control placeholder="Username" value={this.state.username} name="username" onChange={this.onChange} />
                            </Form.Group>
                          </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label style={{fontSize:18}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.newPassword} name="newPassword"  onChange={this.onChange} />
                          </Form.Group>
                        </Form.Row>

                        <Button style = {{float:'right'}} variant="primary" type="Button" onClick={this.createNewUser}>
                          Sign Up
                        </Button>
                      </Form>
                    </Modal>

                      </Form>
                    </div>
                  </nav>
                  <ToastsContainer store={ToastsStore}/>
            </div>
          );
        }
        }
  }

  export default Header
