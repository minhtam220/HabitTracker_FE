import { Box, Card, CardHeader, Typography } from "@mui/material";
import { default as React } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

function ResultCard({}) {
  const { user } = useAuth();
  const dispatch = useDispatch();

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
          subheader={
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                textAlign: "center",
                fontSize: "1em",
              }}
            >
              The hard must become habit. The habit must become easy. The easy
              must become beautiful. – Doug Henning
            </Typography>
          }
        />
      </Card>
      <Box m={2} />
    </>
  );
}

export default ResultCard;
