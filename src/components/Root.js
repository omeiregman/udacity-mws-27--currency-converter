import React, { Component } from 'react';
import TopBar from './TopBar';
import ConverterBoard from './ConverterBoard';

import '../css/style.css';


class Root extends Component {
  render() {
    return(
      <div className="container">
        <div className="root">
          <TopBar />
          <ConverterBoard />
        </div>
      </div>
    )
  }
}

export default Root;
