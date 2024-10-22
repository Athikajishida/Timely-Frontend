// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
<<<<<<< HEAD
=======
import eventsReducer from './eventsSlice'
>>>>>>> cb8e1b0 (Event created)

export const store = configureStore({
  reducer: {
    auth: authReducer,
<<<<<<< HEAD
=======
    events: eventsReducer,

>>>>>>> cb8e1b0 (Event created)
  },
});