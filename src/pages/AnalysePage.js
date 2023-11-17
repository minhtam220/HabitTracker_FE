import { Box, Container } from "@mui/material";
import React from "react";
import HabitTable from "../features/habit/HabitTable";
import ResultCard from "../features/result/ResultCard";
import useAuth from "../hooks/useAuth";

function AnalysePage() {
  const { user } = useAuth();
  /*
  console.log("running AnalysePage");
  console.log(user ? user._id : "User is null");
  */

  return (
    <Container sx={{ display: "block", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "yellow",
        }}
      >
        {/*
            <InstructionCard
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0, // Allow content to shrink
          }}
          stage="analyse"
          day="1"
        />
        
        */}
      </Box>
      <ResultCard
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0, // Allow content to shrink
        }}
      />
      <HabitTable userId={user._id} sx={{ width: "100%" }} />
    </Container>
  );
}

export default AnalysePage;
