import React, { Component } from 'react';
import TopBar from './TopBar';
import ConverterBoard from './ConverterBoard';


class Root extends Component {
  render() {
    return(
      <div>
        <TopBar />
        <ConverterBoard />
      </div>
    )
  }
}

export default Root;
