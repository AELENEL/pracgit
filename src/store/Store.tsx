// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/slice/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
