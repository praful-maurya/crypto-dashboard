import axios from 'axios';
import { setCryptocurrencies, setStatus, setError, setDetails, setHistory, setTickers } from './cryptoSlice';
import { ENDPOINTS } from './api';
import { TYPE } from '../../Constant/constant';

export const fetchCryptoDetails = (id) => async (dispatch) => {
  try {
    dispatch(setStatus(TYPE.LOADING));
    const response = await axios.get(`${ENDPOINTS.CRYPTO_DETAILS}/${id}`);
    dispatch(setDetails(response.data)); 
    dispatch(setStatus(TYPE.SUCCEEDED));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus(TYPE.FAILED));
  }
}

export const fetchCryptoHistory = (id) => async (dispatch) => {
  try {
    dispatch(setStatus(TYPE.LOADING));
    const response = await axios.get(`${ENDPOINTS.CRYPTO_DETAILS}/${id}/market_chart?vs_currency=usd&days=30`);
    dispatch(setHistory(response.data)); 
    dispatch(setStatus(TYPE.SUCCEEDED));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus(TYPE.FAILED));
  }
};

export const fetchTickers = (id) => async (dispatch) => {
  try {
    dispatch(setStatus(TYPE.LOADING));
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/tickers`);
    dispatch(setTickers(response.data));
    dispatch(setStatus(TYPE.SUCCEEDED));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus(TYPE.FAILED));
  }
};

export const fetchCryptocurrencies = (page = 1) => async (dispatch) => {
  try {
    dispatch(setStatus(TYPE.LOADING));
    const response = await axios.get(ENDPOINTS.FETCH_CRYPTO, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: page,
        sparkline: false,
      },
    });
    dispatch(setCryptocurrencies(response.data));
    dispatch(setStatus(TYPE.SUCCEEDED));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus(TYPE.FAILED));
  }
};
