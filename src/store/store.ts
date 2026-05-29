import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productSlice";
import categoryReducer from "../reducer/categorySlice";
import cartReducer from "../reducer/cartSlice";
import wishlistReducer from "../reducer/wishlistSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;