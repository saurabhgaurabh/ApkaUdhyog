import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getClientsDataFromRedux: [], // array to store the clients data
};

const addClientsSlice = createSlice({
    name: "addClients", // addClients is a state name.
    initialState,
    reducers: {
        addClient: (state, action) => { // addClient is a reducer name to add individual client
            state.getClientsDataFromRedux.push(action.payload);
            console.log(state, "state after adding client")
        },
        setClients: (state, action) => { // setClients is a reducer name to replace entire array
            state.getClientsDataFromRedux = action.payload;
            console.log(state, "state after setting clients")
        },
        getClients: (state, action) => { // getclients is a reducer name (keeping for backward compatibility)
            state.getClientsDataFromRedux = action.payload;
            console.log(state, "state")
        },
    },
});

export const { addClient, setClients, getClients } = addClientsSlice.actions;
export default addClientsSlice.reducer;
 