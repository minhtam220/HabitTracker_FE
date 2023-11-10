import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { default as React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getResults } from "./resultSlice";

function ResultCard({}) {
  const {
    isLoading,
    resultsById,
    currentPageResults,
    totalCompletions,
    totalGoodDopamines,
    totalBadDopamines,
  } = useSelector((state) => state.result);

  const results = currentPageResults.map((resultId) => resultsById[resultId]);

  // Assuming 'results' is an array of your results
  const dopamineResults =
    totalGoodDopamines > totalBadDopamines
      ? results.filter((result) => result.habit.type === "good")
      : results.filter((result) => result.habit.type === "bad");

  const resultWithMaxDopamines = dopamineResults.reduce(
    (max, result) =>
      result.totalCompletions > max.totalCompletions ? result : max,
    dopamineResults[0]
  );

  const primeHabit = resultWithMaxDopamines
    ? JSON.stringify(resultWithMaxDopamines.habit.description)
    : null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResults());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader
          disableTypography
          title={
            <Typography
              variant="subtitle2"
              color="text.primary"
              align="center"
              style={{ fontSize: "2em" }}
            >
              Result
            </Typography>
          }
          sx={{ padding: "1px" }} // Adjust the padding as needed
        />
        <CardContent>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
              textAlign: "left",
              fontSize: "1em",
              whiteSpace: "pre-line",
              paddingTop: 1, // Add some top padding for spacing
              paddingBottom: 1, // Add some bottom padding for spacing
            }}
          >
            Completions (for debug only): {totalCompletions}
            {"\n"}
            Current Good Dopamines: {totalGoodDopamines}
            {"\n"}
            Current Bad Dopamines: {totalBadDopamines}
            {"\n"}
            {totalGoodDopamines > totalBadDopamines
              ? "You are doing great! Keep it up!"
              : "You are stressed! Take a break!"}
            {"\n"}
            Current Prime Habit: {primeHabit}
          </Typography>
        </CardContent>
      </Card>
      <Box m={2} />
    </>
  );
}

export default ResultCard;
