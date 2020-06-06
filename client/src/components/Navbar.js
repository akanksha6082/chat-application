import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    alert("you have successfully logged out !!");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <h4>Login</h4>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <h4>Register</h4>
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <h4>Chat</h4>
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
            <h4>
              Logout
              <Icon name="sign out" />
            </h4>
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample10">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <h4>
                  <Icon name="code" />
                  ChatApp
                </h4>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="collapse navbar-collapse justify-content-md-end"
          id="navbarsExample10"
        >
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
