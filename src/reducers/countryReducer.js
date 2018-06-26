import { FETCH_COUNTRY } from '../actions/types';


const initialState = {
  countryList: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_COUNTRY:
    return {
      ...state,
      countryList: action.payload
    };
    default:
    return state;
  }
}
