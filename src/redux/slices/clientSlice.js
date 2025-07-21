import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api";

// Async thunk to fetch clients list
export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${BASE_URL}/client/bulkClient/list/`, {
        headers: {
          Authorization: `Token ${token}`, 
        },
      });
      // response.data.results expected to be array of clients
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch clients");
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
