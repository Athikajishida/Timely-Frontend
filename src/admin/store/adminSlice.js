import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Async thunks
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  }
);

export const fetchEvents = createAsyncThunk(
  'admin/fetchEvents',
  async () => {
    const response = await axiosInstance.get('/admin/events');
    return response.data;
  }
);

export const fetchBookings = createAsyncThunk(
  'admin/fetchBookings',
  async () => {
    const response = await axiosInstance.get('/admin/bookings');
    return response.data;
  }
);

export const blockUser = createAsyncThunk(
  'admin/blockUser',
  async (userId) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/block`);
    return response.data;
  }
);

export const cancelEvent = createAsyncThunk(
  'admin/cancelEvent',
  async (eventId) => {
    const response = await axiosInstance.put(`/admin/events/${eventId}/cancel`);
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  'admin/updateEvent',
  async ({ eventId, eventData }) => {
    const response = await axiosInstance.put(`/admin/events/${eventId}`, eventData);
    return response.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: {
      data: [],
      loading: false,
      error: null,
    },
    events: {
      data: [],
      loading: false,
      error: null,
    },
    bookings: {
      data: [],
      loading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.data = action.payload;
        state.users.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = action.error.message;
      })
    
    // Events
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.events.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events.loading = false;
        state.events.data = action.payload;
        state.events.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.events.loading = false;
        state.events.error = action.error.message;
      })
    
    // Bookings
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.bookings.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings.loading = false;
        state.bookings.data = action.payload;
        state.bookings.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.bookings.loading = false;
        state.bookings.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;