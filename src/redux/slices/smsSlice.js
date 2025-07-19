// src/redux/slices/smsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ⛳ Replace with your actual token logic
const getToken = () => localStorage.getItem("token");

export const sendSMS = createAsyncThunk(
  "sms/send",
  async ({ phone, message }, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://52.74.26.144:8008/api/v1/sms/send",
        {
          mobile: phone,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "SMS failed");
    }
  }
);

const smsSlice = createSlice({
  name: "sms",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSMS.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendSMS.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendSMS.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default smsSlice.reducer;
