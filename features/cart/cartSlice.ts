import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface Sku {
  code: string;
  qtyOrder: number;
}

interface CartState {
  skus: Array<Sku>;
  totalSku: number;
}

const initialState: CartState = {
  skus: [],
  totalSku: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAdded: (state, action: PayloadAction<Sku>) => {
      let cartItem = state.skus.find(
        ({ code }) => code === action.payload.code
      );
      if (cartItem) {
        cartItem.qtyOrder += action.payload.qtyOrder;
      } else {
        state.skus = [...state.skus, action.payload];
        state.totalSku++;
      }
    },
    productRemoved: (state, action: PayloadAction<string>) => {
      let cartItem = state.skus.find(({ code }) => code === action.payload);
      if (cartItem) {
        if (cartItem.qtyOrder > 1) {
          cartItem.qtyOrder--;
        } else {
          state.skus = [...state.skus].filter(({ code }) => {
            return code != action.payload;
          });
          state.totalSku--;
        }
      }
    },
  },
});

export const { productAdded, productRemoved } = cartSlice.actions;

export default cartSlice.reducer;
