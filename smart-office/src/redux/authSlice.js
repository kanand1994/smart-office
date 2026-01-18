import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, token: null, isAuthenticated: false, isLoading: true, error: null,
};

const authSlice = createSlice({
  name: 'auth', initialState,
  reducers: {
    loginStart: (state) => { state.isLoading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.isLoading = false; state.isAuthenticated = true;
      state.user = action.payload.user; state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.isLoading = false; state.isAuthenticated = false; state.error = action.payload;
      state.user = null; state.token = null;
    },
    logout: (state) => {
      state.user = null; state.token = null; state.isAuthenticated = false; state.isLoading = false;
    },
    checkAuthComplete: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.isAuthenticated = true; state.user = action.payload.user; state.token = action.payload.token;
      } else {
        state.isAuthenticated = false; state.user = null; state.token = null;
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, checkAuthComplete } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { loginApi } = require('../services/fakeApi');
    const response = await loginApi(credentials.email, credentials.password);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(loginSuccess({ token, user }));
    return { success: true };
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Login failed";
    dispatch(loginFailure(errorMsg));
    return { success: false, error: errorMsg };
  }
};

export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      dispatch(checkAuthComplete({ token, user }));
    } catch (e) {
      dispatch(checkAuthComplete(null));
    }
  } else {
    dispatch(checkAuthComplete(null));
  }
};

export default authSlice.reducer;