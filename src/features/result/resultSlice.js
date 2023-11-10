import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  resultsById: {},
  currentPageResults: [],
  totalCompletions: 0,
  totalGoodDopamines: 0,
  totalBadDopamines: 0,
  goodPrimeHabit: null,
  badPrimeHabit: null,
};

const slice = createSlice({
  name: "result",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getResultSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, results } = action.payload;
      state.totalCompletions = 0; // Reset totalCompletions before calculating
      state.totalGoodDopamines = 0; // Reset totalGoodDopamines before calculating
      state.totalBadDopamines = 0; // Reset totalBadDopamines before calculating

      if (results) {
        results.forEach((result) => {
          state.resultsById[result._id] = result;
          if (!state.currentPageResults.includes(result._id))
            state.currentPageResults.push(result._id);
          // Assume each result has a 'completions' property that is a number
          if (result.habit.type === "good") {
            state.totalGoodDopamines += result.totalCompletions;
          } else {
            state.totalBadDopamines += result.totalCompletions;
          }
          state.totalCompletions += result.totalCompletions;
        });
      }
      state.totalResults = count;
    },
  },
});

export const getResults = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/results/`);
    dispatch(slice.actions.getResultSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
