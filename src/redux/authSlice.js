import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../constant';


export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.SIGNUP, userData);
      
      toast.success('Signup successful!', {
        position: 'top-right',
        autoClose: 3000, 
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


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.LOGIN, userData);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('userData', JSON.stringify(response.data.data));

      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000, 
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

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.EMAIL_VERIFY, verificationData);
      toast.success('Email verification successful!', {
        position: 'top-right',
        autoClose: 3000, 
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

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    try {
      const response = await axios.post(API.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
      });
      
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000, 
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
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isSignupSuccessful: false,
    isEmailVerified: false, 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isSignupSuccessful = false;
      state.isEmailVerified = false; 
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      toast.success('Logged out successfully!', {
        position: 'top-right',
      });      
    },
    resetSignupSuccess: (state) => {
      state.isSignupSuccessful = false;
    },
    resetEmailVerification: (state) => {
      state.isEmailVerified = false; 
    },
  },
  extraReducers: (builder) => {
    builder
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


