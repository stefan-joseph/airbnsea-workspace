import { Button, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { NavbarContext } from "../../../Navbar";
import {
  desktopMinWidth,
  searchBarTimingFunction,
  searchBarTransitionTime,
} from "../../../../../constants/constants";

export const SearchButton = ({
  searchButtonRef,
}: {
  searchButtonRef?: React.RefObject<HTMLButtonElement>;
}) => {
  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  const iconOnly = useMediaQuery("(max-width:855px)");
  return (
    <Button
      ref={searchButtonRef}
      variant="contained"
      color="primary"
      type="submit"
      disableElevation
      className="search-button"
      sx={{
        height: subSearch ? 50 : 32,
        width: subSearch && !iconOnly ? 120 : subSearch ? 50 : 32,
        minWidth: subSearch ? "unset" : 32,
        p: subSearch ? 2 : 0,
        borderRadius: 6,
        fontSize: 16,
        letterSpacing: ".02em",
        display: "flex",
        justifyContent: "center",
        m: 0.6,
        ml: 1.4,
        animation: `${
          +searchBarTransitionTime.split("ms")[0] / 1.5
        }ms ${searchBarTimingFunction} 0s ${
          subSearch === 0 ? "reverse" : ""
        } expandSearch`,
        "@keyframes expandSearch": {
          "0%": {
            width: "32px",
            height: "32px",
            fontSize: "0px",
          },
          "100%": {
            width: "120px",
            height: "50px",
            fontSize: "14px",
          },
        },

        "&:hover": {
          backgroundColor: subSearch === 0 ? "primary.main" : null,
        },
      }}
    >
      <SearchIcon
        fontSize={subSearch ? "medium" : "small"}
        sx={{ mr: subSearch && !iconOnly ? 1 : 0 }}
      />
      {!subSearch || iconOnly ? "" : "Search"}
    </Button>
  );
};
