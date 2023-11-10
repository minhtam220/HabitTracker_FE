import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { eachDayOfInterval, format, parseISO, startOfWeek } from "date-fns";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "../result/resultSlice";
import HabitCard from "./HabitCard";
import HabitForm from "./HabitForm";
import { getHabits, trackHabit } from "./habitSlice";

const getDatesOfWeek = (givenDay) => {
  const today = givenDay ? new Date(givenDay) : new Date();
  today.setHours(0, 0, 0, 0); // set the time to 00:00:00.000

  //console.log("today " + today);

  // Get the start of the week (Monday)
  const start_of_week = startOfWeek(today, { weekStartsOn: 1 });
  //start_of_week.setHours(0, 0, 0, 0); // set the time to 00:00:00.000
  //console.log("start_of_week " + start_of_week);

  // Get the end of the week (Sunday)
  const end_of_week = new Date(start_of_week);
  end_of_week.setDate(start_of_week.getDate() + 6);
  //end_of_week.setHours(0, 0, 0, 0); // set the time to 00:00:00.000;
  //console.log("end_of_week " + end_of_week);

  // Get each day of the week
  const datesOfWeek = eachDayOfInterval({
    start: start_of_week,
    end: end_of_week,
  });

  // Format the dates as desired (e.g., "2023-11-09T00:00:00.000Z")
  /*
  const formattedDates = datesOfWeek.map((date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0)

    );
    return utcDate.toISOString();
  });

  return formattedDates;
};
*/

  // Format the dates as desired (e.g., "2023-11-09T00:00:00.000Z")
  const formattedDates = datesOfWeek.map((date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0)
    );
    return utcDate.toISOString();
  });

  //console.log("formattedDates " + formattedDates);

  return formattedDates;
};

function HabitTable({ userId }) {
  const [page, setPage] = useState(1);

  //
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Define a function to handle the click event
  const handleIconClick = (completion_date, complete, habitId) => {
    dispatch(trackHabit({ completion_date, complete, habitId })).then(() => {
      dispatch(getHabits());
      dispatch(getResults());
    });
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

  //get the datesOfWeek
  const givenDay = "";
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const datesOfWeek = getDatesOfWeek(givenDay);

  return (
    <div>
      <TableContainer style={{ marginBottom: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center", padding: 0, margin: 0 }}>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  align="center"
                  style={{ fontSize: "2em" }}
                >
                  Habit
                </Typography>
              </TableCell>

              {[...Array(7)].map((_, index) => {
                return (
                  <TableCell
                    key={index}
                    style={{ textAlign: "center", padding: 0, margin: 0 }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.primary"
                      align="center"
                      style={{ fontSize: "2em" }}
                    >
                      {daysOfWeek[index]}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        textAlign: "center",
                        fontSize: "1em",
                      }}
                    >
                      {format(parseISO(datesOfWeek[index]), "d-MMM")}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((habit) => (
              <TableRow>
                <TableCell
                  style={{ textAlign: "center", padding: 0, margin: 0 }}
                >
                  {editingHabit === habit._id ? (
                    <HabitForm key={habit._id} habit={habit} />
                  ) : (
                    <HabitCard key={habit._id} habit={habit} />
                  )}
                </TableCell>

                {[...Array(7)].map((_, index) => {
                  return (
                    <TableCell
                      key={habit._id + index}
                      style={{ textAlign: "center", padding: 0, margin: 0 }}
                    >
                      {habit.completions.some((completion) => {
                        const completionDate = new Date(
                          completion.completion_date
                        );
                        completionDate.setUTCHours(0, 0, 0, 0); // set the time to 00:00:00.000

                        const currentDate = new Date(datesOfWeek[index]);

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
        {isAdding ? (
          <HabitForm isAdding={isAdding} setIsAdding={setIsAdding} />
        ) : (
          <LoadingButton
            variant="outlined"
            size="small"
            onClick={handleAddClick}
          >
            Add Habit
          </LoadingButton>
        )}
      </Box>
    </div>
  );
}

export default HabitTable;
