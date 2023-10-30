import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
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
            {"Good dopamines: \n Bad dopamines: \n Current prime habit: \n"}
          </Typography>
        </CardContent>
      </Card>
      <Box m={2} />
    </>
  );
}

export default ResultCard;
