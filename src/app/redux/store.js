import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainSlice";

export const store = configureStore({
  reducer: {
    account: mainSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
