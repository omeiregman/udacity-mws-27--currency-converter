import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCountry } from '../actions/countryActions';


import '../css/style.css';

class Converter extends Component {

  constructor(){
    super();

    this.state = {
      fromCurrency: '',
      toCurrency: '',
      convertInput: '',
      rate: '',
      converted: '',
      readyState: false,
      toDisplay: ''
    }

    this.sendData = this.sendData.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
    this.currencyCalc = this.currencyCalc.bind(this);
    this.openDatabase = this.openDatabase.bind(this);
    }

  componentWillMount() {
    //this.getData();
    this.props.fetchCountry();
    this.openDatabase();
    //this.storeIDB();
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }


  sendData = () => {
    const API_URL = "https://free.currencyconverterapi.com/api/v5/convert";
    const query = this.state.fromCurrency + "_" + this.state.toCurrency;

    fetch(`${API_URL}?q=${query}&compact=ultra`)
      .then((response) => {
        return response.json();
        })
      .then((rate) => {
        const rateValue = rate[query];
        console.log('Rate: ', rateValue);
        this.setState({
          rate: rateValue,
            });
            console.log("State: ", this.state);
            return rateValue;
      });
  }

  currencyCalc = () => {
        let input = Number(this.state.convertInput);
        let rate = Number(this.state.rate);
        let converted = input * rate;
        this.setState({
          converted: Math.round(converted * 100)/ 100,
          toDisplay: this.state.toCurrency
        });
  }


  convertCurrency = () => {
    this.sendData();
    this.currencyCalc();
    }

    openDatabase = () => {

          let countryData = this.props.countries;

          // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
          var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

          const DB_NAME = "countryDB";
          // Open (or create) the database
          const open = indexedDB.open(DB_NAME, 1);

          // Create the schema
          open.onupgradeneeded = function() {
            const db = open.result;
            const store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
            const index = store.createIndex("by-id", "id");
          };

          open.onsuccess = () => {
          // Start a new transaction
            const db = open.result;
            const tx = db.transaction("MyObjectStore", "readwrite");
            const store = tx.objectStore("MyObjectStore");
          //  const index = store.index("by-id");


            console.log("Putting more objexts...");
            const keyObject = Object.keys(countryData).map((list) => (console.log("Data from Key loop", countryData), store.put(countryData[list])));

            console.log("Key Obj: ", keyObject);

          tx.oncomplete = function() {
            db.close();
          };
        }

    }




  render() {

    const display = this.state.rate * this.state.convertInput;
    const countryData = this.props.countries;
    const keyObject = Object.keys(countryData).map((list) => (
    <option key={countryData[list].id} value={countryData[list].id}>{countryData[list].id}, {(countryData[list].currencyName).slice(0, 28)}</option>
    ));

    return(
      <div className="converter-component">
        <div className="container">
          <div className="">
            <div className="currency">

              <div className="row">
                <div className="col-md-6">
                  <span className="currency-hint">Input Amount and Currency to convert</span>
                  <div className="row  left-currency">
                    <div className="col-md-4">
                      <input type="number" className="currency-input" name="convertInput" onChange={this.onChange} value={this.state.convertInput} />
                    </div>
                    <div className="col-md-8 custom-dropdown">
                      <select name="fromCurrency" className="currency-select" value={this.state.from} onChange={this.onChange}>
                        <option value="0">Select Currency</option>
                        {keyObject}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <span className="currency-hint">Convert to</span>
                  <div className="row right-currency">
                    <div className="col-md-8 custom-dropdown">
                      <select name="toCurrency" className="currency-select" value={this.state.to} onChange={this.onChange}>
                        <option value="0">Select Currency</option>
                        {keyObject}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input type="submit" className="convert-btn" value="CONVERT" onClick={this.convertCurrency}/>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="converted-display">
              <br></br>
              <h2>
                {display} {this.state.toDisplay}
              </h2>
            </div>
            <hr/>
          </div>
        </div>
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
