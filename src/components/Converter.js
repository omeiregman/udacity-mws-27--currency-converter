import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCountry } from '../actions/countryActions';


class Converter extends Component {

  constructor(){
    super();

    this.state = {
      fromCurrency: '',
      toCurrency: '',
      convertInput: '',
      rate: '',
      converted: '',
      readyState: false
    }

    this.sendData = this.sendData.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
    this.currencyCalc = this.currencyCalc.bind(this);
  }

  componentWillMount() {
    this.props.fetchCountry();
    //console.log(this.state);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onChangeRate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    }


  sendData = () => {
    const API_URL = "https://free.currencyconverterapi.com/api/v5/convert";
    const query = this.state.fromCurrency + "_" + this.state.toCurrency;

    fetch(`${API_URL}?q=${query}&compact=ultra`)
      .then((response) => {
        return response.json();
        })
      .then((rate) => {
        console.log("Rate: ", rate);
        const rateValue = rate[query];
        //console.log('Parameters', rateValue);
        this.setState({
          rate: rateValue,
            });
            console.log("State: ", this.state);
      });
  }

  currencyCalc = () => {
    let input = this.state.convertInput;
    let rate = this.state.rate;
    console.log("Converting...");
    console.log("Input: ", input);
    console.log("Rate: ", rate);
    let converted = Number(input) * Number(rate);
    console.log("Converted: ", converted);
    this.setState({
      converted: converted
    });
  }

  convertCurrency = () => {
    this.sendData();
    this.currencyCalc();
  }



  render() {
    const countryData = this.props.countries;
    const keyObject = Object.keys(countryData).map((list) => (
    <option key={countryData[list].id} value={countryData[list].id}>{countryData[list].id}, {countryData[list].currencyName}</option>
    ));

    return(
      <div>
        <h2>Converter Component</h2>
        <input type="number" name="convertInput" onChange={this.onChange} value={this.state.convertInput} />
        <select name="fromCurrency" value={this.state.from} onChange={this.onChangeRate}>
          <option value="0">Select Currency</option>
          {keyObject}
        </select>
        <select name="toCurrency" value={this.state.to} onChange={this.onChangeRate}>
          <option value="0">Select Currency</option>
          {keyObject}
        </select>
        <button onClick={this.convertCurrency}>Convert</button>
        <h2>
          {this.state.converted}
        </h2>
      </div>
    );
  }
}


// Converter.propTypes = {
//   fetchCountry: PropTypes.func.isRequired,
//   country: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
  countries: state.country.countryList
});


export default connect(mapStateToProps, { fetchCountry })(Converter);
