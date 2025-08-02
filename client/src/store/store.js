// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"; // <-- Add this

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // <-- Register here
  },
});
