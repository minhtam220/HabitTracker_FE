import { Card, Container } from "@mui/material";
import React from "react";
import HabitTable from "../features/habit/HabitTable";
import useAuth from "../hooks/useAuth";

function AnalysePage() {
  const { user } = useAuth();
  console.log("running AnalysePage");
  console.log(user ? user._id : "User is null");

  return (
    <Container>
      <Card sx={{ mb: 3, position: "relative" }}>
        <HabitTable userId={user._id} />
      </Card>
    </Container>
  );
}

export default AnalysePage;
