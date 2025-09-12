// action , kis type ka action h data fetch ka ya get ka 
// action -> type(increment or decrement) , payload(extradata fetch krne ke liye or main h ki kis type ka action h ya uska name kya h)
// reducer, kis type action aa ra h or kya updation krni h
//  store

// a slice is a combination of action or reducers
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 
const initialState = {
    itemList: [],
    loading: false,
    error: null,
};
const itemSlice = createSlice({
    name: "items", // reducer name
    initialState,
    reducers: {
        setItems: (state, action) => { // Sets the entire list of items (e.g., from API fetch)
            state.itemList = action.payload;
        },
        addItem: (state, action) => { // Adds a single item to the list
            state.itemList.push(action.payload);
        },
    },
});

export const { setItems, addItem } = itemSlice.actions;
export default itemSlice.reducer;