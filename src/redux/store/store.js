import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../slices/itemSlice"; // import the item itemSlice reducer itemSlice.js

const store = configureStore({
  reducer: {
    items: itemReducer,   // items is reducer name taken from itemSlice.js line no. 16
  },
});

export default store;