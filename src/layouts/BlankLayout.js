import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <Stack
      spacing={3}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{
          fontFamily: "Monaco", // Change the font family
          fontSize: "5rem", // Change the font size
          fontWeight: "bold", // Change the font weight
          textAlign: "center", // Center the text within the Typography component
        }}
      >
        37.78
      </Typography>
      <Outlet style={{ backgroundColor: "#f0f0f0" }}></Outlet>
    </Stack>
  );
}

export default BlankLayout;
