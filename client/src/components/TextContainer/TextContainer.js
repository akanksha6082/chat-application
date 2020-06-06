import React, { Component } from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";
class Invite extends Component{

}
const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div></div>
    {users ? (
      <div>
        <h1>People currently in Room:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <img alt="Online Icon" src={onlineIcon} />
                {" " + name}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
