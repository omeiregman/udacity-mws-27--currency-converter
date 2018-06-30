import React, { Component } from 'react';
import '../css/style.css';
import logo_img from '../images/logo.png';



class TopBar extends Component {
  render() {
    return(
      <div className="container">
        <div className="row top-bar">
        <h3 className="logo-text">Currency Converter (Udacity mws track--group 34)</h3>
        </div>
      </div>
    )
  }
}

export default TopBar;
