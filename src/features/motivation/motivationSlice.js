import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  text: null,
};

const slice = createSlice({
  name: "motivation",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMotivationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.text = action.payload.motivation["text"];
    },
  },
});

export const getMotivation = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/motivations/`);
    dispatch(slice.actions.getMotivationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export default slice.reducer;
