import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

import { Card, Container, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import HabitList from "../features/habit/HabitList";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function CheckPage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Card sx={{ mb: 3, height: 400, position: "relative" }}>
        Check Page Welcome to 37.78, {user.username}
        Here is your habits
        <HabitList userId={user._id} />
        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          ></Tabs>
        </TabsWrapperStyle>
      </Card>
    </Container>
  );
}

export default CheckPage;
