import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../slices/itemSlice"; // import the item itemSlice reducer itemSlice.js
import addDealerReducer from "../slices/addDealerSlice"; // import the addDealer slice reducer

const store = configureStore({
  reducer: {
    items: itemReducer,   // items reducer for managing item list data
    addDealer: addDealerReducer, // addDealer reducer for managing dealers data
  },
});

export default store;
