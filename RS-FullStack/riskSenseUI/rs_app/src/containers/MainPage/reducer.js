
import { fromJS } from 'immutable';

import {
    LOAD_RISK_DATA,
    LOAD_RISK_DATA_SUCCESS,
    LOAD_RISK_DATA_ERR
  } from './constants';

// The initial state of the App
const initialState = fromJS({
    riskData: []
  });

function appReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_RISK_DATA_SUCCESS:
        return state
          .set('riskData',action.riskData)
      default:
        return state;
    }
  }

  export default appReducer;
