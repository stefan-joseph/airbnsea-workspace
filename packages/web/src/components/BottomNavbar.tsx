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
import { FiSearch } from "react-icons/fi";
import {
  IoSearchOutline,
  IoSearch,
  IoBoatOutline,
  IoChatboxOutline,
  IoChatbox,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import {
  bottomNavbarHeight,
  searchBarBorderColor,
} from "../constants/constants";
import { Link, useLocation } from "react-router-dom";

export const BottomNavbar = () => {
  const { pathname } = useLocation();

  const [value, setValue] = useState(pathname);

  const navItems = [
    {
      label: "Explore",
      selectedIcon: <IoSearchOutline />,
      unselectedIcon: <IoSearchOutline />,
      href: "/",
    },
    {
      label: "Wishlists",
      selectedIcon: <IoMdHeartEmpty />,
      unselectedIcon: <IoMdHeartEmpty />,
      href: "",
    },
    {
      label: "Trips",
      selectedIcon: <IoBoatOutline />,
      unselectedIcon: <IoBoatOutline />,
      href: "",
    },
    {
      label: "Messages",
      selectedIcon: <IoChatboxOutline />,
      unselectedIcon: <IoChatboxOutline />,
      href: "/inbox",
    },
    {
      label: "Profile",
      selectedIcon: <IoPersonCircleOutline />,
      unselectedIcon: <IoPersonCircleOutline />,
      href: "",
    },
  ];

  return (
    <Box
      borderTop="1px solid"
      borderColor={searchBarBorderColor}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (!newValue) return;
          setValue(newValue);
        }}
        sx={{ height: bottomNavbarHeight }}
      >
        {navItems.map(({ label, selectedIcon, unselectedIcon, href }) => (
          <BottomNavigationAction
            key={label}
            icon={pathname === href ? selectedIcon : unselectedIcon}
            value={href}
            label={
              <Box
                fontSize={11}
                color={pathname === href ? "info.main" : "grey.600"}
                mt={0.6}
                fontWeight={pathname === href ? 600 : 400}
              >
                {label}
              </Box>
            }
            component={Link}
            to={href}
            sx={{
              minWidth: "unset",
              padding: 0.1,
              fontSize: 24,
              cursor: href ? "pointer" : "default",
              color: "grey.600",
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
