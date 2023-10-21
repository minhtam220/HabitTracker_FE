import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  text: null,
};

const slice = createSlice({
  name: "instruction",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getInstructionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.text = action.payload.instruction["text"];
    },
  },
});

export const getInstruction =
  ({ stage, day }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/instructions/`, {
        stage,
        day,
      });
      dispatch(slice.actions.getInstructionSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export default slice.reducer;
