import { useState, useRef, useContext } from "react";
import { Avatar, Button, MenuItem, MenuList } from "@mui/material";
import { IoMenuOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { PopperMenu } from "../../../../../components/PopperMenu";
import { AppContext } from "../../../../../context/context";

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
              color: authenticated && firstName ? "#FFF" : "grey.600",
              backgroundColor: authenticated && firstName ? "grey.600" : "#FFF",
            }}
          >
            {authenticated && firstName ? (
              Array.from(firstName)[0]
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
              <MenuItem sx={{ color: "initial" }}>Messages</MenuItem>
            </Link>
            <Link to="/create-listing">
              <MenuItem sx={{ color: "initial" }}>Create Listing</MenuItem>
            </Link>
            <Link to="/logout">
              <MenuItem sx={{ color: "initial" }}>Log out</MenuItem>
            </Link>
          </MenuList>
        ) : (
          <MenuList sx={{ width: 200 }}>
            <Link to="/register">
              <MenuItem sx={{ color: "initial" }}>Sign up</MenuItem>
            </Link>
            <Link to="/login">
              <MenuItem sx={{ color: "initial" }}>Log in</MenuItem>
            </Link>
          </MenuList>
        )}
      </PopperMenu>
    </>
  );
};
