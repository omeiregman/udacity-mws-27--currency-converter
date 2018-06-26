import { FETCH_COUNTRY } from './types';

export const fetchCountry = () => dispatch => {
  console.log("Fetching...");
    fetch('https://free.currencyconverterapi.com/api/v5/countries')
    .then(res => res.json())
    .then(country =>
      dispatch({
        type: FETCH_COUNTRY,
        payload: country.results
      })
    );
  }
