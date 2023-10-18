import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
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
    getHabitSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, habits } = action.payload;
      console.log("running getHabitSuccess");
      console.log(action.payload);

      habits.forEach((habit) => {
        state.habitsById[habit._id] = habit;
        if (!state.currentPageHabits.includes(habit._id))
          state.currentPageHabits.push(habit._id);
      });

      state.totalHabits = count;
    },
    resetHabits(state, action) {
      state.habitsById = {};
      state.currentPageHabits = [];
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
    },
  },
});

export const createHabit =
  ({ name, description, goalValue, goalFrequency }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/habits`, {
        name,
        description,
        goalValue,
        goalFrequency,
      });
      dispatch(slice.actions.createHabitSuccess(response.data));
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
      });
      //console.log(response);
      dispatch(slice.actions.updatePostSuccess(response.data));
      toast.success("Update Habit Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getHabits = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  console.log("running getHabits");

  try {
    const response = await apiService.get(`/habits/me`);

    console.log(response.data);

    dispatch(slice.actions.getHabitSuccess(response.data));
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
