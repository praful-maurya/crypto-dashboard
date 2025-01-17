import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cryptocurrencies: [],
  cryptoDetails: null,
  cryptoHistory: null,
  tickers: [],
  simplePrice: {},
  filters: {
    minPrice: 0,
    maxPrice: 10000,
  },
  status: 'idle',
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptocurrencies(state, action) {
      state.cryptocurrencies = [...state.cryptocurrencies, ...action.payload];
    },

    setDetails(state, actions){
      state.cryptoDetails = actions.payload
    },

    setHistory(state, actions) {
      state.cryptoHistory = actions.payload;
    },

    setTickers(state, action) {
      state.tickers = action.payload;
    },

    setSimplePrice(state, action) {
      state.simplePrice = action.payload;
    },

    resetFilters: (state) => {
      state.filters = {
        minPrice: 0,
        maxPrice: 10000, 
      };
      state.page = 1;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCryptocurrencies, setStatus, setError, setDetails, setHistory, setTickers, setSimplePrice, resetFilters  } = cryptoSlice.actions;

export default cryptoSlice.reducer;
