import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <img className="welwave" src="img/welwave1.png" alt=" " />
        <div className="welcontainer">
          <div className="jumbotron my-0 py-0 mx-0 px-0">
            <div className="col-sm-6  mx-auto my-auto">
              <br></br>
              <img className="logo" src="img/logo512.png" alt=" " />
              <h1 className="text-center">WELCOME TO WHATSWORK! </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
