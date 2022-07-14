import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getBicycles = createAsyncThunk('rentalShop/getBicycles', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get('http://localhost:3002/Bicycles');
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  
  return result;
});

const RentalShopSlice = createSlice({
  name: 'rentalShop',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getBicycles.pending]: (state, { payload }) => {
      return { ...state, loading: true }
    },
    [getBicycles.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null
      }
    },
    [getBicycles.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : 'Server Error'
        }
      }
    }
  },
});

export default RentalShopSlice.reducer;