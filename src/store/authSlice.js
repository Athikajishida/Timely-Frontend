import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

<<<<<<< HEAD
=======
// Register User
>>>>>>> cb8e1b0 (Event created)
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const response = await axiosInstance.post('/signup',userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
=======
      const response = await axiosInstance.post('/signup', userData);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
>>>>>>> cb8e1b0 (Event created)
    }
  }
);

<<<<<<< HEAD
=======
// Confirm OTP
>>>>>>> cb8e1b0 (Event created)
export const confirmOTP = createAsyncThunk(
  'auth/confirmOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/confirm_email', { email, otp });
<<<<<<< HEAD
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
      try {
        const payload = {
          email: formData.email,
          password: formData.password
        };
        const response = await axiosInstance.post('/login', payload);
        localStorage.setItem('token', response.data.token);
        return response.data.user;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
=======
      localStorage.setItem('token', response.data.token);
      return response.data;
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
>>>>>>> cb8e1b0 (Event created)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    registrationSuccess: false,
  },
  reducers: {
<<<<<<< HEAD
=======
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
>>>>>>> cb8e1b0 (Event created)
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
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
=======
      // Register User
>>>>>>> cb8e1b0 (Event created)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
<<<<<<< HEAD
=======
        state.error = null; // Clear error after success
>>>>>>> cb8e1b0 (Event created)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
<<<<<<< HEAD
      })
=======
        localStorage.removeItem('token'); // Clean up token if registration fails
      })

      // Confirm OTP
>>>>>>> cb8e1b0 (Event created)
      .addCase(confirmOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
<<<<<<< HEAD
=======
        state.error = null; // Clear error after success
>>>>>>> cb8e1b0 (Event created)
      })
      .addCase(confirmOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
<<<<<<< HEAD
=======

      // Login User
>>>>>>> cb8e1b0 (Event created)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
<<<<<<< HEAD
=======
        state.error = null; // Clear error after success
>>>>>>> cb8e1b0 (Event created)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
<<<<<<< HEAD
=======
        localStorage.removeItem('token'); // Clean up token if login fails
>>>>>>> cb8e1b0 (Event created)
      });
  },
});

<<<<<<< HEAD
export const { logout, clearError, clearRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;
=======
export const { setUser, logout, clearError, clearRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;
>>>>>>> cb8e1b0 (Event created)
