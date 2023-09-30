import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habit/habitSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = {
  user: userReducer,
  habit: habitReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
