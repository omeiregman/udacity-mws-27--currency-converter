import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCountry } from '../actions/countryActions';


class Converter extends Component {

  componentWillMount() {
    this.props.fetchCountry();
  }


  render() {
    const countryData = this.props.countries;
    console.log("From Render: ", countryData);

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


// Converter.propTypes = {
//   fetchCountry: PropTypes.func.isRequired,
//   country: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
  countries: state.country.countryList
});


export default connect(mapStateToProps, { fetchCountry })(Converter);
