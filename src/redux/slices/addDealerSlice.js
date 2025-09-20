import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dealersGet: [], // Array to store the list of dealers added via Redux
  dealers: [],
};

const addDealerSlice = createSlice({
  name: "addDealer", //state name
  initialState,
  reducers: {
    addDealer: (state, action) => { // addDealer is reducer name to add individual dealer
      state.dealersGet.push(action.payload);
      console.log(state, "state after adding dealer")
    },
    setDealers: (state, action) => { // setDealers is reducer name to replace entire array
      state.dealersGet = action.payload;
      console.log(state, "state after setting dealers")
    },
    getDealers: (state, action) => { // getDealers is reducer name (keeping for backward compatibility)
      state.dealersGet = action.payload;
      console.log(state, "slice dat")
    },
    addDealerData: (state, action) => { //addDealerData is reducer name
      state.dealers.push(action.payload);
      console.log(state, "check data")
    },
  },
});

export const { addDealer, setDealers, getDealers, addDealerData } = addDealerSlice.actions;
export default addDealerSlice.reducer;
