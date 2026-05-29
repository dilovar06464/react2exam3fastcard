import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../api/CategoryApi";

interface Category {
  id: number;
  categoryName: string;
  categoryImage: string | null;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: any;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
