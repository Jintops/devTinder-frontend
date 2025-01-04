import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from './feedSlice'
import connectinReducer from "./connectionSlice"

const appStore = configureStore({
    reducer:{
      user:userReducer,
      feed:feedReducer,
      connections:connectinReducer,
    }
});

export default appStore;