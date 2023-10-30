import { Container } from "@mui/material";
import React from "react";
import HabitTable from "../features/habit/HabitTable";
import InstructionCard from "../features/instruction/InstructionCard";
import useAuth from "../hooks/useAuth";

function AnalysePage() {
  const { user } = useAuth();
  /*
  console.log("running AnalysePage");
  console.log(user ? user._id : "User is null");
  */

  return (
    <Container>
      <InstructionCard
        sx={{ mb: 3, position: "relative" }}
        stage="analyse"
        day="1"
      />
      {/*<MotivationCard sx={{ mb: 3, position: "relative" }} /> */}
      {/*<ResultCard sx={{ mb: 3, position: "relative" }} /> */}
      <HabitTable userId={user._id} />
    </Container>
  );
}

export default AnalysePage;
