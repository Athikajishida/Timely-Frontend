// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import eventsReducer from './eventsSlice'

export const store = configureStore({

  reducer: {
    auth: authReducer,
    events: eventsReducer,

  },
  devTools :true
});