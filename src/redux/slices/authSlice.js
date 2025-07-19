import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await api.post('/auth/login/', formData);
    return response.data; 
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    const token = getState().auth.token;
    if (!token) throw new Error('No token found');

    await api.post(
      '/auth/logout/',
      {},
      { headers: { Authorization: `Token ${token}` } }
    );
    // logout success, 
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearToken(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { clearToken } = authSlice.actions;

export default authSlice.reducer;
