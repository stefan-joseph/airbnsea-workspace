import { Box, useMediaQuery } from "@mui/material";
import { useContext } from "react";

import {
  searchBarHeight,
  searchBarTimingFunction,
  searchBarTransitionTime,
} from "../../../constants/constants";
import { NavbarContext } from "../Navbar";

export const NavbarContainer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  const matches = useMediaQuery("(min-width:750px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: matches ? "space-between" : "center",
        alignItems: matches ? "flex-start" : "center",
        p: { xs: 2, lg: 4 },
        pt: { xs: 2, lg: 2 },
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        borderBottom: "1px solid",
        borderBottomColor: "grey.300",
        width: "100vw",
        backgroundColor: "#FFF",
        height: subSearch ? 150 : matches ? searchBarHeight : 80,
        transition: `height ${searchBarTransitionTime} ${searchBarTimingFunction}`,
      }}
    >
      {children}
    </Box>
  );
};
