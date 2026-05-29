import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosRequest } from "../utils/token";

export const getProducts = createAsyncThunk(
  "products/getProducts", 
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Product/get-products");
      return data?.data?.products || data?.products || data || [];
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: any, { dispatch, rejectWithValue }: any) => {
    try {
      await axiosRequest.delete(`/Product/${id}`);
      dispatch(getProducts());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (state: any, { dispatch, rejectWithValue }) => {
    const requestData = {
      title: state.title || state.name,
      description: state.description || "Fresh greenshop plant product",
      price: Number(state.price) || 0,
      images: Array.isArray(state.file) ? state.file : (state.file ? [state.file] : ["https://images.unsplash.com/photo-1545241047-6083a3684587?w=300"])
    };

    try {
      await axiosRequest.post("/Product/createProduct", requestData);
      dispatch(getProducts());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);