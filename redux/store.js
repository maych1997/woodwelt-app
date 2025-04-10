import { configureStore } from "@reduxjs/toolkit";
import loadReducer from "./Slice"; // Import your reducer

const store = configureStore({
  reducer: {
    load: loadReducer, // Add more reducers as needed
  },
});

export default store;
