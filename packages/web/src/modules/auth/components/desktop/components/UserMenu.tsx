import { useState, useRef, useContext } from "react";
import { Avatar, Button, MenuItem, MenuList, Typography } from "@mui/material";
import { IoMenuOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { PopperMenu } from "../../../../../components/PopperMenu";
import { AppContext } from "../../../../../context/context";
import { theme } from "../../../../../MuiTheme";

export const UserMenu = () => {
  const buttonRef = useRef(null);

  const {
    globalState: {
      user: { authenticated, avatar, firstName },
    },
  } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
        variant="outlined"
        color="inherit"
        sx={{
          borderRadius: 10,
          borderColor: "grey.300",
          p: 0.8,
          pl: 1.3,
          pr: 1.3,
          boxShadow: isOpen ? "0 2px 4px rgba(0,0,0,0.18)" : "unset",
          "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,0.18)",
            backgroundColor: "unset",
          },
        }}
        startIcon={<IoMenuOutline size={24} />}
        endIcon={
          <Avatar
            src={avatar ? avatar : undefined}
            alt="User avatar"
            sx={{
              width: 30,
              height: 30,
              marginLeft: -1,
              fontSize: 10,
              color: authenticated && firstName ? "#FFF" : "grey.600",
              backgroundColor:
                authenticated && firstName ? theme.palette.info.main : "#FFF",
            }}
          >
            {authenticated && firstName ? (
              <Typography color="#FFF" mt={0.4} fontSize={18}>
                {Array.from(firstName)[0]}
              </Typography>
            ) : (
              <FaUserCircle size={28} />
            )}
          </Avatar>
        }
      />
      <PopperMenu
        open={isOpen}
        anchorEl={buttonRef}
        handleClose={() => setIsOpen(false)}
        marginTop={1}
        boxShadow="0 2px 16px rgba(0,0,0,0.12)"
      >
        {authenticated ? (
          <MenuList sx={{ width: 200 }}>
            <Link to="/inbox">
              <MenuItem sx={{ color: "initial", fontSize: 14 }}>
                Messages
              </MenuItem>
            </Link>
            <Link to="/create-listing">
              <MenuItem sx={{ color: "initial", fontSize: 14 }}>
                Create Listing
              </MenuItem>
            </Link>
            <Link to="/logout">
              <MenuItem sx={{ color: "initial", fontSize: 14 }}>
                Log out
              </MenuItem>
            </Link>
          </MenuList>
        ) : (
          <MenuList sx={{ width: 200 }}>
            <Link to="/login">
              <MenuItem
                sx={{ color: "initial", fontWeight: 600, fontSize: 14 }}
              >
                Log in
              </MenuItem>
            </Link>
            <Link to="/login">
              <MenuItem sx={{ color: "initial", fontSize: 14 }}>
                Sign up
              </MenuItem>
            </Link>
          </MenuList>
        )}
      </PopperMenu>
    </>
  );
};
