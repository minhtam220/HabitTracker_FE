import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { default as React, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { toggleUpdateHabit } from "./habitSlice";

function HabitCard({ habit }) {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleHabitMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const dispatch = useDispatch();

  const handleDeleteHabit = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      // Perform deletion logic here
      // Call your delete API or update the state to remove the post/comment
      /*
      dispatch(deleteHabit({ habitId: habit._id }));
      */
    }
  };

  const handleEditHabit = () => {
    dispatch(toggleUpdateHabit({ habitId: habit._id }));
  };

  const renderHabitMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleToggleHabitMenu}
    >
      <MenuItem onClick={handleDeleteHabit} sx={{ mx: 1 }}>
        Delete Habit
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleEditHabit} sx={{ mx: 1 }}>
        Edit Habit
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Card>
        <CardHeader
          disableTypography
          title={
            <Typography variant="subtitle2" color="text.primary">
              {habit?.name}
            </Typography>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {habit?.description}
            </Typography>
          }
          action={
            <IconButton onClick={handleToggleHabitMenu}>
              <MoreVert sx={{ fontSize: 30 }} />
              {user._id === habit.userId && renderHabitMenu}
            </IconButton>
          }
        />
      </Card>
      <Box m={2} />
    </>
  );
}

export default HabitCard;
