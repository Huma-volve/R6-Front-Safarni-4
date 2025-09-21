import { configureStore } from "@reduxjs/toolkit";
import toursReducer from "./tour/tour";

export const store = configureStore({
  reducer: {
    tours: toursReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
