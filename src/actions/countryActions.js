import { FETCH_COUNTRY } from './types';

//const BASE_URL = 'https://free.currencyconverterapi.com/api/v5/currencies';


export const fetchCountry = () => dispatch => {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(res => res.json())
    .then(country =>
      dispatch({
        type: FETCH_COUNTRY,
        payload: country.results
      })
    );
  }
