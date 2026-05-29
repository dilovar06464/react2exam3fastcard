import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string | number;
  productName: string;
  price: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
}

const loadCartState = (): CartItem[] => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error parsing cart from localStorage", err);
    return [];
  }
};

const initialState: CartState = {
  items: loadCartState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => 
          item.id === action.payload.id && 
          item.selectedSize === action.payload.selectedSize && 
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<{ id: string | number; selectedSize?: string; selectedColor?: string }>) => {
      state.items = state.items.filter(
        (item) => 
          !(item.id === action.payload.id && 
            item.selectedSize === action.payload.selectedSize && 
            item.selectedColor === action.payload.selectedColor)
      );
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string | number; selectedSize?: string; selectedColor?: string; quantity: number }>) => {
      const item = state.items.find(
        (item) => 
          item.id === action.payload.id && 
          item.selectedSize === action.payload.selectedSize && 
          item.selectedColor === action.payload.selectedColor
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', '[]');
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
