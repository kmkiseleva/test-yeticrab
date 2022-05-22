import { configureStore } from "@reduxjs/toolkit";
import requests from "./requestsReducer";

const store = configureStore({
  reducer: {
    requests
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
