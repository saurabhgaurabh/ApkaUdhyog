import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import itemReducer from "../slices/itemSlice"; // import the item itemSlice reducer itemSlice.js
import addDealerReducer from "../slices/addDealerSlice"; // import the addDealer slice reducer
import addClientsReducer from "../slices/AddClientsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["addDealer", "addClients", "addMyDealers"], // only addDealer slice will be persisted
};

const rootReducer = combineReducers({
  items: itemReducer,
  addDealer: addDealerReducer,
  addClients: addClientsReducer,

  addMyDealers: addDealerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable check for redux-persist
    }),
});

export const persistor = persistStore(store);

export default store;
