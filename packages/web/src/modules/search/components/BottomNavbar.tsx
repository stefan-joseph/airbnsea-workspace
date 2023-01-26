import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SailingOutlinedIcon from "@mui/icons-material/SailingOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { bottomNavbarHeight } from "../../../constants/constants";

export const BottomNavbar = () => {
  const [value, setValue] = useState(0);

  const navItems = [
    { label: "Explore", icon: <SearchRoundedIcon /> },
    { label: "Wishlists", icon: <FavoriteBorderRoundedIcon /> },
    { label: "Trips", icon: <SailingOutlinedIcon /> },
    { label: "Inbox", icon: <ChatBubbleOutlineRoundedIcon /> },
    { label: "Profile", icon: <PersonOutlineRoundedIcon /> },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ height: bottomNavbarHeight, fontSize: 10 }}
      >
        {navItems.map(({ label, icon }) => (
          <BottomNavigationAction
            key={label}
            icon={icon}
            label={<Box fontSize={11}>{label}</Box>}
            sx={{ minWidth: "unset" }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
