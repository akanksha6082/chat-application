import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";
import Vchat from './components/Chat/Vchat'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          {/* <div className="container"> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/vchat/:roomID" component={Vchat} />

          {/* </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
