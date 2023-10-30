import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HabitCard from "./HabitCard";
import { getHabits, trackHabit } from "./habitSlice";

function HabitTable({ userId }) {
  const [page, setPage] = useState(1);

  // Define a function to handle the click event
  const handleIconClick = (completion_date, complete, habitId) => {
    console.log("result_date " + completion_date);
    console.log("complete " + complete);
    console.log("habitId " + habitId);
    dispatch(trackHabit({ completion_date, complete, habitId }));
    dispatch(getHabits());
  };

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
    dispatch(getHabits());
  }, [dispatch]);

  const incrementCount = (habitId, dayIndex) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId
        ? {
            ...habit,
            counts: habit.counts.map((count, index) =>
              index === dayIndex ? count + 1 : count
            ),
          }
        : habit
    );

    console.log(updatedHabits);
  };

  //given the day, get the dates of week
  //given the today is 20/Oct, calculate the datesOfWeek
  //datesOfWeek should be [Monday 16/Oct, Tuesday 17/Oct, Wednesday 18/Oct, Thursday 19/Oct, Friday 20/Oct, Saturday 21/Oct, Sunday 22/Oct]
  function getDatesOfWeek(givenDay) {
    const today = givenDay ? new Date(givenDay) : new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Calculate the date of Monday in the current week
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    // Initialize an array to store the dates
    const datesOfWeek = [];

    // Loop to get the dates of the week
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      datesOfWeek.push(date);
    }

    // Format the dates as desired (e.g., "Monday 16/Oct")
    const formattedDates = datesOfWeek.map((date) => {
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    });

    return formattedDates;
  }

  //get the datesOfWeek
  const givenDay = "";
  const datesOfWeek = getDatesOfWeek(givenDay);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Habit</TableCell>
              {[...Array(7)].map((_, index) => {
                return (
                  <TableCell key={index}>
                    {<div>{datesOfWeek[index]}</div>}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((habit) => (
              <TableRow>
                <TableCell>
                  <HabitCard key={habit._id} habit={habit} />
                </TableCell>

                {[...Array(7)].map((_, index) => {
                  return (
                    <TableCell
                      key={habit._id + index}
                      style={{ textAlign: "center" }}
                    >
                      {habit.completions.some((completion) => {
                        const completionDate = new Date(
                          completion.completion_date
                        );
                        const currentDate = new Date(datesOfWeek[index]);

                        //console.log("resultDate" + resultDate);
                        //console.log("datesOfWeek[index]" + datesOfWeek[index]);

                        return (
                          completionDate.getDate() === currentDate.getDate() &&
                          completionDate.getMonth() ===
                            currentDate.getMonth() &&
                          completion.complete === true
                        );
                      }) ? (
                        habit.type === "good" ? (
                          <SentimentSatisfiedAltRoundedIcon
                            onClick={() =>
                              handleIconClick(
                                datesOfWeek[index],
                                false,
                                habit._id
                              )
                            }
                            style={{ fontSize: "4em" }} // Adjust the size here (you can use different units like px, rem, etc.)
                          />
                        ) : (
                          <SentimentDissatisfiedRoundedIcon
                            onClick={() =>
                              handleIconClick(
                                datesOfWeek[index],
                                false,
                                habit._id
                              )
                            }
                            style={{ fontSize: "4em" }} // Adjust the size here (you can use different units like px, rem, etc.)
                          />
                        )
                      ) : (
                        <RadioButtonUncheckedIcon
                          onClick={() =>
                            handleIconClick(datesOfWeek[index], true, habit._id)
                          }
                          style={{ fontSize: "4em" }} // Adjust the size here (you can use different units like px, rem, etc.)
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalHabits < 5 ? (
          <LoadingButton variant="outlined" size="small">
            Add Habits
          </LoadingButton>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
}

export default HabitTable;
