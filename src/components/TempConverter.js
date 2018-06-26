import React, { Component } from 'react';

class TempConverter extends Component {

  constructor(props){
    super(props);

    this.state = {
      country: {},
    }
  }
  componentWillMount() {
    let countryData = [];
    // fetch('https://free.currencyconverterapi.com/api/v5/countries')
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(country) {
    //     const countryList = [];
    //     countryList.push(country);
    //     countryData = countryList;
    //     console.log('CountryData: ', countryData);
    //   });

    fetch('https://free.currencyconverterapi.com/api/v5/countries')
      .then(response => {
        return response.json();
      })
      .then(country => {
        this.setState({
          country: country.results
        });
        console.log('Country Data', country);
      });
      console.log('Country State: ', this.state.country);
  }

  componentDidMount() {
      console.log(this.state.country);
  }

  render() {
    const theList = this.state.country;
    console.log("the list: ", theList);

    return(
      <div>
        <h2>Converter Component</h2>

        <input type="number" name="from" />
        <select>
          <option>Select Currency</option>
          <option value="NG">Nigerian Naira</option>
          <option value="EUR">European EURO</option>
          <option value="USD">US Dollar</option>
        </select>
        <select>
          <option>Select Currency</option>
          <option value="NG">Nigerian Naira</option>
          <option value="EUR">European EURO</option>
          <option value="USD">US Dollar</option>
        </select>

      </div>
    )
  }
}


export default TempConverter
