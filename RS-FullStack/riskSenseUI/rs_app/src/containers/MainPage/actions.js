import {
    LOAD_RISK_DATA,
    LOAD_RISK_DATA_SUCCESS,
    LOAD_RISK_DATA_ERR
  } from './constants';

  export function loadMainPageData() {
    return {
      type: LOAD_RISK_DATA,

    };
  }

  export function mainPageLoaded(riskData) {
  return {
    type: LOAD_RISK_DATA_SUCCESS,
    riskData,
  };
}

export function mainPageError(error) {
  return {
    type: LOAD_RISK_DATA_ERR,
    error,
  };
}
