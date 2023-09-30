import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HabitCard from "./HabitCard";
import HabitForm from "./HabitForm";
import { getHabits } from "./habitSlice";

function HabitList({ userId }) {
  const [page, setPage] = useState(1);
  const {
    habitsById,
    currentPageHabits,
    totalHabits,
    isLoading,
    editingHabit,
  } = useSelector((state) => state.habit);
  const habits = currentPageHabits.map((habitId) => habitsById[habitId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getHabits({ userId, page }));
  }, [userId, page, dispatch]);

  return (
    <div>
      {habits.map((habit) =>
        /*(
          <HabitCard key={habit._id} habit={habit} />
        )*/

        habit._id === editingHabit ? (
          <HabitForm key={habit._id} habit={habit} />
        ) : (
          <HabitCard key={habit._id} habit={habit} />
        )
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalHabits ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalHabits) && habits.length >= totalHabits}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No habits</Typography>
        )}
      </Box>
    </div>
  );
}

export default HabitList;
