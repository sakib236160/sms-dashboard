import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import smsReducer from "./slices/smsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sms: smsReducer,
  },
});

