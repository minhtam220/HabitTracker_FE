import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
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
            <Typography
              variant="subtitle2"
              color="text.primary"
              align="center"
              style={{ fontSize: "2em" }}
            >
              Motivation
            </Typography>
          }
          sx={{ padding: "1px" }} // Adjust the padding as needed
        />

        <CardContent>
          <Typography
            variant="body1"
            align="center"
            sx={{
              display: "block",
              color: "text.secondary",
              textAlign: "center",
              fontSize: "1em",
              whiteSpace: "pre-line", // This preserves both spaces and line breaks
            }}
            style={{ fontStyle: "italic" }}
          >
            {text ? text : "Your quote goes here."}
          </Typography>
        </CardContent>
      </Card>
      <Box m={2} />
    </>
  );
}

export default MotivationCard;
