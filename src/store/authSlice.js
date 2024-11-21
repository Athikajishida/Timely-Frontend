import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

// Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/signup', userData);
      // localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

// Confirm OTP
export const confirmOTP = createAsyncThunk(
  'auth/confirmOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/confirm_email', { email, otp });
        // Ensure token is stored
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        // Return the full response data including user and token
        return {
          token: response.data.token,
          user: response.data.user
        };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const payload = { email: formData.email, password: formData.password };
      const response = await axiosInstance.post('/login', payload);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    registrationSuccess: false,
    pendingConfirmation: false, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    clearPendingConfirmation: (state) => {
      state.pendingConfirmation = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.pendingConfirmation = true;
        state.error = null; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('token'); // Clean up token if registration fails
      })

      // Confirm OTP
      .addCase(confirmOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.pendingConfirmation = false;
        state.error = null;
      })
      .addCase(confirmOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null; // Clear error after success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('token'); // Clean up token if login fails
      });
  },
});

export const { setUser, logout, clearError, clearRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;
