import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../constant';

// Thunk for user signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.SIGNUP, userData);
      toast.success('Signup successful!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.LOGIN, userData);

      // Store the token and user data in localStorage
      localStorage.setItem('token', response.data.token); // Adjust key based on your response structure
      localStorage.setItem('userData', JSON.stringify(response.data));

      toast.success('Login successful!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for email verification
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.EMAIL_VERIFY, verificationData);
      toast.success('Email verification successful!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Email verification failed!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating user profile
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
    loading: false,
    error: null,
    isSignupSuccessful: false,
    isEmailVerified: false, // New flag for email verification tracking
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isSignupSuccessful = false;
      state.isEmailVerified = false; // Reset email verified status on logout
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      toast.info('Logged out successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    resetSignupSuccess: (state) => {
      state.isSignupSuccessful = false;
    },
    resetEmailVerification: (state) => {
      state.isEmailVerified = false; // Action to manually reset the email verification flag
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.isSignupSuccessful = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isSignupSuccessful = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSignupSuccessful = false;
      })
      // Handle email verification cases
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.isEmailVerified = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isEmailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isEmailVerified = false;
      });
  },
});

export const { logout, resetSignupSuccess, resetEmailVerification } = authSlice.actions;
export default authSlice.reducer;


