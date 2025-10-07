import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dealersGet: [], // Array to store the list of dealers added via Redux
  // dealers: [],
  myDealers: [],
};

const addDealerSlice = createSlice({
  name: "addDealers", //state name
  initialState,
  reducers: {
    addMyDealers: (state, action) => {
      state.myDealers = action.payload;
    },
    setMyDealers: (state, action) => {
      state.myDealers = action.payload;
    },





    addDealer: (state, action) => { // addDealer is reducer name to add individual dealer
      const newDealer = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      state.dealersGet = [...state.dealersGet, newDealer];
      console.log(state, "state after adding dealer")
    },
  },
});

export const { addMyDealers, setMyDealers, addDealer, setDealers, getDealers, addDealerData } = addDealerSlice.actions;
export default addDealerSlice.reducer;
