import React, { Component } from 'react';
import Converter from './Converter';
import TempConverter from './TempConverter';


class ConverterBoard extends Component {
  render() {
    return(
      <div>
        <h1>Converter Board</h1>
        <Converter/>
        {/* <TempConverter /> */}
      </div>
    )
  }
}

export default ConverterBoard;
