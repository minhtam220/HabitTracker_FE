import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../app/components/Logo";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const { user, logout } = useAuth();

  console.log(user);

  console.log(user.username);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenu = (
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
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleLogout} component={RouterLink} sx={{ mx: 1 }}>
        Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Habit Tracker
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              src={user.username}
              alt={user.username}
              onClick={handleProfileMenuOpen}
            />
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
