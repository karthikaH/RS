/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectMainPage = (state) => state.get('MainPage');

const makeRiskDataLoading = () => createSelector(
   selectMainPage,
   (state) => state.get('riskData')
);

export {
    selectMainPage,
    makeRiskDataLoading
  };
