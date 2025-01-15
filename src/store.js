import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './features/Crypto/cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
