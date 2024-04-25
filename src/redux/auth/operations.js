import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
axios.defaults.headers = { 'Content-Type': 'application/json' };

const setAuthHeader = token => (axios.defaults.headers['Authorization'] = token);

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/signup', userData);

    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

export const logIn = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', userData);
    setAuthHeader(data.token);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/logout');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) return thunkAPI.rejectWithValue('Unable to fetch user');

  setAuthHeader(persistedToken);
  try {
    const { data } = await axios.get('/users/current');

    return { token: persistedToken, user: data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
