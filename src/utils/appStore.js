import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from './feedSlice'
import connectinReducer from "./connectionSlice"
import requestReducer from './requestSlice'
import registerReducer from './registerSlice'
const appStore = configureStore({
    reducer:{
      user:userReducer,
      feed:feedReducer,
      connections:connectinReducer,
      requests:requestReducer,
      register:registerReducer,

      
    }
});

export default appStore;