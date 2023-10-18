import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";

const pages = [
  { name: "Home", url: "/home" },
  { name: "Discover", url: "/discover" },
  { name: "Watch Later", url: "/watchlater" },
];

const settings = ["Profile", "Log out"];

export default function MainHeader({ searchInput, handleSearchInputChange }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate();
  let location = useLocation();

  let auth = useAuth();

  function handleLogout() {
    let from = location.state?.from?.pathname || "/login";
    auth.logout(() => {
      navigate(from);
    });
  }

  return (
    <AppBar position="static">
      <Container sx={{ maxWidth: "xl", minWidth: "xs" }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: "none" }} to={page.url}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            <Logo
              sx={{
                width: "64px",
                mr: 1,
              }}
            ></Logo>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", lg: "flex" },
            }}
          >
            {pages.map((page) => (
              <Link style={{ textDecoration: "none" }} to={page.url}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexGrow: 0,
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by titles…"
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src={window.localStorage.getItem("imageUrl")}
                  variant="square"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    {setting}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
