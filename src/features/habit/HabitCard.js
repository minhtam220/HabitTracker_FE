import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
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

  const [isHovered, setIsHovered] = useState(false);

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
      <MenuItem onClick={handleEditHabit} sx={{ mx: 1 }}>
        Edit Habit
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleDeleteHabit} sx={{ mx: 1 }}>
        Delete Habit
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          border: "2px solid white",
          borderRadius: 2,
          "&:hover": {
            border: "2px solid #ccc",
            "& .iconButton": {
              visibility: "visible",
            },
          },
          padding: 0,
          margin: 0,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              margin: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                textAlign: "center",
                fontSize: "1em",
                whiteSpace: "pre-line",
              }}
            >
              {habit?.description}
            </Typography>

            <IconButton
              className="iconButton"
              onClick={handleToggleHabitMenu}
              style={{ visibility: isHovered ? "visible" : "hidden" }}
            >
              <MoreVert sx={{ fontSize: 30 }} />
              {user._id === habit.userId && renderHabitMenu}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <Box m={2} />
    </>
  );
}

export default HabitCard;
