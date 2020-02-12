import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import Dashboard from "./Dashboard";

import "./App.css";
import UserProfile from "./UserProfile"
import Search from "./Search"

class App extends Component {
  render() {
    return (

      <>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/UserProfile" component={UserProfile} />
          <Route exact path="/Search" component={Search} />
          {/*<Footer />*/}
        </Router>
      </>
    );
  }
}

export default App;
