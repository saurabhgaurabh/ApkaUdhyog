import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dealersGet: [], // Array to store the list of dealers added via Redux
  dealers: [],
};

const addDealerSlice = createSlice({
  name: "addDealer", //state name
  initialState,
  reducers: {
    getDealers: (state, action) => { // setDealers is reducer name
      state.dealersGet = action.payload;  // state name
      console.log(state, "slice dat")

    },
    addDealerData: (state, action) => { //addDealerData is reducer name
      state.dealers.push(action.payload);
      console.log(dealers, "check data")
    },
  },
});

export const { getDealers, addDealerData } = addDealerSlice.actions;
export default addDealerSlice.reducer;
