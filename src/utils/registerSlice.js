import { createSlice } from "@reduxjs/toolkit";

const registerSlice=createSlice({
    name:'register',
    initialState:{
        showRegister:false,
    },
    reducers:{
        toggleShowRegister:(state)=>{
            state.showRegister=!state.showRegister
        }
    }
})


export const {toggleShowRegister}=registerSlice.actions
export default registerSlice.reducer;