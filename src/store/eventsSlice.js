import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/events');
      console.log('API Response:', response.data); // Debug log

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/events', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const transformedData = {
        event: {
          title: data.title,
          description: data.description,
          event_type: data.event_type,  // Make sure to use correct properties here
          start_date: data.start_date,
          end_date: data.end_date,
          start_time: data.start_time,
          end_time: data.end_time,
          buffer_time: data.buffer_time,
          color: data.color,
          platform: data.platform,
          customlink: data.customlink,
          days_available: data.days_available,
          participant_emails: data.participant_emails || [],
        },
      };

      const response = await axiosInstance.put(`/events/${id}`, transformedData);
      
      return {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        type: response.data.event_type,
        dateRange: {
          startDate: response.data.start_date,
          endDate: response.data.end_date,
        },
        timeRange: {
          startTime: response.data.start_time,
          endTime: response.data.end_time,
        },
        bufferTime: response.data.buffer_time,
        color: response.data.color,
        platform: response.data.platform,
        customLink: response.data.customlink,
        daysAvailable: response.data.days_available,
        emails: response.data.participant_emails || [],
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/events/${id}`);
      return id; // Return the id to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (token, { rejectWithValue }) => {
    try {
      // Updated URL to match Rails route
      const response = await axiosInstance.get(`/schedule/${token}`);
      console.log('API Response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response); // Debug log
      return rejectWithValue(error.response?.data || 'Event not found');
    }
  }
);
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add event
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(event => event.id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the event already exists in the items array
        const existingEventIndex = state.items.findIndex(
          event => event.scheduling_link === action.payload.scheduling_link
        );
        
        if (existingEventIndex !== -1) {
          // Update existing event
          state.items[existingEventIndex] = action.payload;
        } else {
          // Add new event
          state.items.push(action.payload);
        }
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default eventsSlice.reducer;