import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import purchasesReducer from './slices/purchasesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    purchases: purchasesReducer,
  },
});

export default store;


