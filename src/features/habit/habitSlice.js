import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  isAdding: false,
  error: null,
  habitsById: {},
  currentPageHabits: [],
  editingHabit: null,
};

const slice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createHabitSuccess(state, action) {
      state.isLoading = false;
      state.isAdding = false;
      state.error = null;
      const newHabit = action.payload;
      state.habitsById[newHabit._id] = newHabit;
      state.currentPageHabits.push(newHabit._id);
    },
    getHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, habits } = action.payload;
      //console.log("running getHabitSuccess");
      //console.log(action.payload);
      habits.forEach((habit) => {
        state.habitsById[habit._id] = habit;
        if (!state.currentPageHabits.includes(habit._id))
          state.currentPageHabits.push(habit._id);
      });
      state.totalHabits = count;
    },
    getSingleHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("running getSingleHabitSuccess");
      const habit = action.payload.habit;
      console.log(habit);
      console.log(state.habitsById[habit._id]);
      state.habitsById[habit._id] = habit;
    },
    resetHabits(state, action) {
      state.habitsById = {};
      state.currentPageHabits = [];
    },
    trackHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    calculateResultsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    deleteHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      //remove habit from habitsById and currentPageHabits
      const habitId = action.payload._id;
      delete state.habitsById[habitId];
      const indexToRemove = state.currentPageHabits.indexOf(habitId);
      state.currentPageHabits.splice(indexToRemove, 1);
    },
    toggleUpdateHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      //add habit to editingHabit
      state.editingHabit = action.payload;
    },
    updateHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      //remove habit from editingHabit
      state.editingHabit = null;
      console.log("running updateHabitSuccess");
      const updatedHabit = action.payload;
      console.log(updatedHabit);
      state.habitsById[updatedHabit._id] = updatedHabit;
    },
  },
});

export const createHabit =
  ({ description, type }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/habits`, {
        description,
        type: type ? type : "good",
      });
      dispatch(slice.actions.createHabitSuccess(response.data));
      //toast.success("Create Habit Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const updateHabit =
  ({ description, habitId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/habits/${habitId}`, {
        description,
        type: "good",
      });
      //console.log(response);
      dispatch(slice.actions.updateHabitSuccess(response.data));
      //toast.success("Update Habit Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getHabits = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    const response = await apiService.get(`/habits/me`);
    dispatch(slice.actions.getHabitSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getSingleHabit = (habitId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/habits/${habitId}`);
    dispatch(slice.actions.getSingleHabitSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const trackHabit =
  ({ completion_date, complete, habitId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/habits/${habitId}/completions`, {
        completion_date,
        complete,
      });
      dispatch(slice.actions.trackHabitSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const calculateResults = (end_date) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/results/calculate`, {
      end_date,
    });
    dispatch(slice.actions.calculateResultsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const toggleUpdateHabit =
  ({ habitId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.toggleUpdateHabitSuccess(habitId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deleteHabit =
  ({ habitId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //console.log("postId", postId);
      const response = await apiService.delete(`/habits/${habitId}`);
      //console.log(response);
      dispatch(slice.actions.deleteHabitSuccess(response.data));
      //toast.success("Delete Habit Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
