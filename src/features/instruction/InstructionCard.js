import { Box, Card, CardHeader, Typography } from "@mui/material";
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
            <Typography variant="subtitle2" color="text.primary">
              Instruction
            </Typography>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {text}
            </Typography>
          }
        />
      </Card>
      <Box m={2} />
    </>
  );
}

export default InstructionCard;
