import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from "./slices/dashboardSlice";
import clientReducer from './slices/clientSlice';


export const Store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    client: clientReducer,
  },
});

