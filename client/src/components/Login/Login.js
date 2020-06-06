import React, { Component } from "react";
import { login } from "../UserFunctions";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    login(user).then((res) => {
      if (typeof res !== "object") {
        if (res) {
          console.log("in here.....");
          this.props.history.push(`/profile`);
        }
      }
    });
  }

  render() {
  
    return (
      <div>
        <img className="wave" src="img/wave.png" alt=" " />
        <div className="containerImage">
          <div className="img">
            <img src="img/profile.svg" alt=" " />
          </div>
          <div className="login-content">
            <form onSubmit={this.onSubmit}>
              <img src="img/mobile.svg" alt="" />
              <h2 className="title">LOGIN</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="email"
                    className="input"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <br></br>
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  {/* <h5 htmlFor="password">Password</h5> */}
                  <br />
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              <br />
              <input type="submit" className="btn" value="Sign In!" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
