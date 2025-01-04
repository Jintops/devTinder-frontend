import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:'connections',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>action.payload,
        removieConnections:(state,action)=>null,
    }
})

export const {addConnections,removieConnections} =connectionSlice.actions;
export default connectionSlice.reducer;