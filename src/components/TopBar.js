import React, { Component } from 'react';
import '../css/style.css';
import logo_img from '../images/logo.png';



class TopBar extends Component {
  render() {
    return(
      <div className="container">
        <div className="row top-bar">
          <div className="col-md-1">
            <img src={logo_img} alt="payrush"/>
          </div>

          <div className="col-md-2">
            <h3 className="logo-text">payrush</h3>
          </div>

        </div>
      </div>
    )
  }
}

export default TopBar;
