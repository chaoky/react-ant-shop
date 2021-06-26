import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import allProducs from './products';

interface AppState {
  items: ShopItem[];
  shopCart: ShopCart;
}
interface ShopCart {
  items: {
    [id: number]: undefined | { ammomunt: number };
  };
  total: number;
  shippingFee: number;
  freeShipping: boolean;
}
export interface ShopItem {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
}

const initialState: AppState = {
  items: allProducs,
  shopCart: { items: [], total: 0, shippingFee: 0, freeShipping: false },
};

export const appState = createSlice({
  name: 'appState',
  initialState,
  //immer
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      let { shopCart } = state;

      if (!shopCart.items[action.payload])
        shopCart.items[action.payload] = { ammomunt: 0 };
      shopCart.items[action.payload]!.ammomunt++;

      shopCart.total += state.items.find(({ id }) => id == action.payload)!.price;
      shopCart.shippingFee += 10;

      if (shopCart.total >= 250) shopCart.freeShipping = true;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const { shopCart } = state;

      shopCart.items[action.payload]!.ammomunt += -1;
      if (shopCart.items[action.payload]!.ammomunt == 0)
        shopCart.items[action.payload] = undefined;

      shopCart.total += -state.items.find(({ id }) => id == action.payload)!.price;
      shopCart.shippingFee += -10;

      if (shopCart.total < 250) shopCart.freeShipping = false;
    },
  },
});

export const store = configureStore({
  reducer: {
    appState: appState.reducer,
  },
});

export const { addToCart, removeFromCart } = appState.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectCount = (state: RootState) => state.appState;
