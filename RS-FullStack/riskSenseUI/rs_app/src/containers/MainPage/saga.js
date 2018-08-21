/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    LOAD_RISK_DATA,
    LOAD_RISK_DATA_SUCCESS,
    LOAD_RISK_DATA_ERR
  } from './constants';

import { loadMainPageData, mainPageLoaded, mainPageError} from './actions';

import request from '../../utils/request';


export function* getRiskData() {
  const requestURL = `http://localhost:3000/`;
  try {
    const riskData = yield call(request, requestURL);
    yield put(mainPageLoaded(riskData));
  } catch (err) {
    yield put(mainPageError(err));
  }
}

/* Root saga manages watcher lifecycle */
export default function* getEachItemPageData() {
  yield takeLatest(LOAD_RISK_DATA, getRiskData);
}
