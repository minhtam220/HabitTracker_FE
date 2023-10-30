import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getInstruction } from "./instructionSlice";

function InstructionCard({ stage, day }) {
  const { user } = useAuth();

  console.log("stage" + stage);
  console.log("day" + day);

  const text = useSelector((state) => state.instruction.text);

  console.log(text);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstruction({ stage, day }));
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
              Instruction
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
              textAlign: "center",
              fontSize: "1em",
              whiteSpace: "pre-line", // This preserves both spaces and line breaks
            }}
          >
            {text
              ? text
              : "We all have enough will power to build or break one habit at a time.\n - List the 5 habits you want to break or build.\n - Keep track of them for one week starting from today.\n - Know the prime habit on Day 7 and start building it."}
          </Typography>
        </CardContent>
      </Card>
      <Box m={2} />
    </>
  );
}

export default InstructionCard;
