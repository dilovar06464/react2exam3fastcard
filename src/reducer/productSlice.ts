import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/ProductApi";

interface ProductState {
  type: string;
  products: any[];
  isLoading: boolean;
  error: any;
}

const initialState: ProductState = {
  type: localStorage.getItem("type") || "card",
  products: [],
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload == "card" ? "list" : "card";
      localStorage.setItem("type", state.type);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: productActions } = productSlice;
export default productSlice.reducer;