import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string | number;
  productName: string;
  price: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  image: string;
  rating?: number;
  quantity?: number; // review count or stock fallback
}

interface WishlistState {
  items: WishlistItem[];
}

const loadWishlistState = (): WishlistItem[] => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error parsing wishlist from localStorage", err);
    return [];
  }
};

const initialState: WishlistState = {
  items: loadWishlistState(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem('wishlist', '[]');
    }
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
