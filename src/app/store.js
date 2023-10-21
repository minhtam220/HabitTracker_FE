import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habit/habitSlice";
import instructionReducer from "../features/instruction/instructionSlice";
import motivationReducer from "../features/motivation/motivationSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = {
  user: userReducer,
  habit: habitReducer,
  instruction: instructionReducer,
  motivation: motivationReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
