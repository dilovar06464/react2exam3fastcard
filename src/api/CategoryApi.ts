import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Category/get-categories");
      return Array.isArray(data) ? data : (data?.data || []);
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
