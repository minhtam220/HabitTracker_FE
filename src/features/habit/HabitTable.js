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
import { getHabits } from "./habitSlice";

function HabitTable({ userId }) {
  const [page, setPage] = useState(1);
  // Define a state to keep track of the checked state
  const [isChecked, setIsChecked] = useState(false);

  // Define a function to handle the click event
  const handleIconClick = () => {
    setIsChecked(!isChecked);
  };

  const {
    habitsById,
    currentPageHabits,
    totalHabits,
    isLoading,
    editingHabit,
  } = useSelector((state) => state.habit);

  const habits = currentPageHabits.map((habitId) => habitsById[habitId]);

  const habitOne = {
    _id: "6527ff513bc4769f6b04b3b0",
    description: "Read a book for 20 minutes before bedtime",
    type: "good",
    // ... (other properties)
    results: [
      // ... (result objects)

      {
        _id: "6528dd8c3bc4769f6b04b3d7",
        result_date: "2023-10-16T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
      {
        _id: "6528dd8c3bc4769f6b04b3d8",
        result_date: "2023-10-10T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
      {
        _id: "6528dd8c3bc4769f6b04b3d9",
        result_date: "2023-10-11T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
      {
        _id: "6528dd8c3bc4769f6b04b3da",
        result_date: "2023-10-12T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
      {
        _id: "6528dd8c3bc4769f6b04b3db",
        result_date: "2023-10-13T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
      {
        _id: "6528dd8c3bc4769f6b04b3dc",
        result_date: "2023-10-14T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
      {
        _id: "6528dd8c3bc4769f6b04b3dd",
        result_date: "2023-10-15T00:00:00.000Z",
        complete: false,
        stage: "analyse",
        habit: "6527ff513bc4769f6b04b3b0",
        totalCompletions: 0,
        totalDopamines: 0,
        currentStreak: 0,
      },
    ],
  };

  const habitTwo = {
    _id: "6527ff513bc4769f6b04b3b2",
    description: "Avoid sugary snacks and drinks",
    type: "good",
    user: "65164604273dec1588a68451",
    results: [],
  };

  const habitThree = {
    _id: "6527ff513bc4769f6b04b3b3",
    description: "Smoking cessation program",
    type: "bad",
    user: "65164604273dec1588a68451",
    results: [],
  };

  const habitFour = {
    _id: "6527ff513bc4769f6b04b3b1",
    description: "Limit screen time to 2 hours per day",
    type: "good",
    user: "65164604273dec1588a68451",
    results: [],
  };

  const habitFive = {
    _id: "6527ff513bc4769f6b04b3af",
    description: "Exercise for 30 minutes daily",
    type: "good",
    user: "65164604273dec1588a68451",
    results: [],
  };

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

  // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const today = new Date().getDay();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const datesOfWeek = [];

  for (let index = 0; index < 7; index++) {
    const date = new Date(Date.now() + (index - 2) * 24 * 60 * 60 * 1000);
    datesOfWeek[index] = date;
  }

  //console.log(datesOfWeek);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Habit</TableCell>
              {[...Array(7)].map((_, index) => {
                //index from 0 to 6
                //const date = new Date(Date.now() + index * 24 * 60 * 60 * 1000);
                const date = new Date(
                  Date.now() + (index - 2) * 24 * 60 * 60 * 1000
                );
                //Mon Oct 16 2023 15:00:21 GMT+0700 (GMT+07:00)

                const formattedDate = `${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}`;

                /*
                console.log("today index " + today);
                console.log("index " + index);
                console.log("date " + date);
                console.log("formattedDate " + formattedDate);

                */

                //const dayOfWeek = daysOfWeek[(index + 0) % 7]; // Start from Monday
                const dayOfWeek = daysOfWeek[index];

                return (
                  <TableCell key={index}>
                    {index + 1 === today ? (
                      <div>
                        Today <br /> {formattedDate}
                      </div>
                    ) : (
                      <div>
                        {dayOfWeek} <br /> {formattedDate}
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((habit) => (
              <TableRow key={habit._id}>
                <TableCell>
                  <HabitCard key={habit._id} habit={habit} />
                </TableCell>

                {[...Array(7)].map((_, index) => {
                  return (
                    <TableCell>
                      {/*habit.results
                        .filter((result) => {
                          const resultDate = new Date(result.result_date);
                          return (
                            resultDate.getDate() ===
                              datesOfWeek[index].getDate() &&
                            resultDate.getMonth() ===
                              datesOfWeek[index].getMonth()
                          );
                        })
                        .map((result) => (
                          <div key={result._id}>
                            {result._id}, result_date: {result.result_date}
                          </div>
                        ))*/}
                      {habit.results.some((result) => {
                        const resultDate = new Date(result.result_date);
                        return (
                          resultDate.getDate() ===
                            datesOfWeek[index].getDate() &&
                          resultDate.getMonth() ===
                            datesOfWeek[index].getMonth() &&
                          result.complete === true
                        );
                      }) ? (
                        habit.type === "good" ? (
                          <SentimentSatisfiedAltRoundedIcon
                            onClick={handleIconClick}
                          />
                        ) : (
                          <SentimentDissatisfiedRoundedIcon
                            onClick={handleIconClick}
                          />
                        )
                      ) : (
                        <RadioButtonUncheckedIcon onClick={handleIconClick} />
                      )}
                    </TableCell>
                  );
                })}

                {/*habit.counts.map((count, index) => (
                  <TableCell key={index}>
                    <Button
                      variant="contained"
                      onClick={() => incrementCount(habit.id, index)}
                    >
                      yes
                    </Button>
                  </TableCell>
                ))*/}
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
