import { Box, useMediaQuery } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import {
  appSidePaddingAlt,
  appSidePadding,
  desktopMinWidth,
  searchBarHeight,
  searchBarTimingFunction,
  searchBarTransitionTime,
} from "../../../constants/constants";
import { NavbarContext } from "../Navbar";

export const NavbarContainer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | false;
}) => {
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");

  const { conversationId } = useParams();

  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  const matches = useMediaQuery(desktopMinWidth);

  useEffect(() => {
    // closes navbar on screen size change if passes mobile/desktop threshold
    dispatch({
      type: "SET_SUB_SEARCH",
      payload: 0,
    });
  }, [matches]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: matches ? "space-between" : "center",
        alignItems: matches ? "flex-start" : "center",
        p: 1.68,
        pl: conversationId || where ? appSidePaddingAlt : appSidePadding,
        pr: conversationId || where ? appSidePaddingAlt : appSidePadding,
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
