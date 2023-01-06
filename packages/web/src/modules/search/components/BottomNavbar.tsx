import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SailingOutlinedIcon from "@mui/icons-material/SailingOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

export const BottomNavbar = () => {
  const [value, setValue] = useState(0);

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
      >
        <BottomNavigationAction label="Explore" icon={<SearchRoundedIcon />} />
        <BottomNavigationAction
          label="Wishlists"
          icon={<FavoriteBorderRoundedIcon />}
        />
        <BottomNavigationAction label="Trips" icon={<SailingOutlinedIcon />} />
        <BottomNavigationAction
          label="Inbox"
          icon={<ChatBubbleOutlineRoundedIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonOutlineRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
