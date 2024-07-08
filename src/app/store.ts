import { configureStore } from "@reduxjs/toolkit";
import { summrizerApi } from "./article";
export const store = configureStore({
  reducer: {
    [summrizerApi.reducerPath]: summrizerApi.reducer,
  },
  //   middleware: (getDefaultMiddelware) =>
  //     getDefaultMiddelware?.concat(summrizerApi.middleware),
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware().concat(summrizerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
