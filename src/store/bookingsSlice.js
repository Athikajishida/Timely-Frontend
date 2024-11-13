import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axiosInstance from '../utils/axiosInstance';

export const createBooking = createAsyncThunk(
  'bookings/create',
  async ({ eventId, scheduledTime }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/bookings', {
        event_id: eventId,
        scheduled_time: scheduledTime
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/bookings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  successMessage: null
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.successMessage = 'Booking confirmed successfully!';
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBookingMessages } = bookingsSlice.actions;

// Memoized selectors
const selectBookingsState = (state) => state.bookings;

export const selectUserBookings = createSelector(
  selectBookingsState,
  (bookingsState) => bookingsState.items
);

export const selectBookingStatus = createSelector(
  selectBookingsState,
  (bookingsState) => ({
    loading: bookingsState.loading,
    error: bookingsState.error,
    successMessage: bookingsState.successMessage
  })
);

export const selectConfirmedBooking = createSelector(
  [selectUserBookings, (_, eventId) => eventId],
  (bookings, eventId) => bookings.find(booking => booking.event_id === eventId && booking.status === 'confirmed')
);

export default bookingsSlice.reducer;