import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { logIn, logOut, refreshUser, register } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const setAuth = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, setAuth)
      .addCase(register.rejected, (state, action) => {
        if (action.payload === 400) state.error = { message: 'This email has already been taken' };
        else state.error = action.payload;
      })
      .addCase(logIn.fulfilled, setAuth)
      .addCase(logIn.rejected, state => {
        state.error = { message: 'Incorrect email or password' };
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        setAuth(state, action);
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = { message: action.payload.message };
        state.isRefreshing = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whiteList: ['token'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
