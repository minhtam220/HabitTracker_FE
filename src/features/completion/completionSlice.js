import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  completionsById: {},
  currentCompletions: [],
  totalCompletions: 0,
};

const slice = createSlice({
  name: "completion",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCompletionsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, results } = action.payload;

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

export const getCompletions =
  ({ habitId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/{$habitId}results/`);
      dispatch(slice.actions.getResultSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
