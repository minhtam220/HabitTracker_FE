import { Box, Card, CardHeader, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getMotivation } from "./motivationSlice";

function MotivationCard() {
  const { user } = useAuth();

  const text = useSelector((state) => state.motivation.text);

  console.log(text);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMotivation());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader
          disableTypography
          title={
            <Typography variant="subtitle2" color="text.primary">
              Motivation
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

export default MotivationCard;