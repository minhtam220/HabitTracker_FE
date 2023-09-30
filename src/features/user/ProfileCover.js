import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import useAuth from "../../hooks/useAuth";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    backdropFilter: `blur(1px)`,
    backgroundColor: alpha(theme.palette.primary.darker, 0.7),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

function ProfileCover({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const handleError = (e) => {
    const imgIndex = Math.floor(Math.random() * 5) + 1;
    e.target.src = `/covers/cover_${imgIndex}.avif`;
    e.target.onError = null;
  };

  return (
    <RootStyle>
      <InfoStyle></InfoStyle>

      <Box sx={{ overflow: "hidden" }}></Box>
    </RootStyle>
  );
}

export default ProfileCover;
