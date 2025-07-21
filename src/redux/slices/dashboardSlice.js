import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Backend API base URL
const BASE_URL = "/api";

// Async thunk to fetch SMS info
export const fetchSMSInfo = createAsyncThunk(
  "dashboard/fetchSMSInfo",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${BASE_URL}/client/bulkClient/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    //   client/bulkClient/list/

      console.log("SMS INFO RESPONSE:", response.data);

      const firstClient = response.data?.results?.[0];

      return {
        smsCount: firstClient?.total_sms || 0,
        balance: firstClient?.balance || 0,
      };
    } catch (error) {
      console.log("Fetch SMS Info Error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to fetch SMS info");
    }
  }
);

// Initial state
const initialState = {
  smsCount: 0,
  balance: 0,
  loading: false,
  error: null,
};

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSMSInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSMSInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.smsCount = action.payload.smsCount;
        state.balance = action.payload.balance;
      })
      .addCase(fetchSMSInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;