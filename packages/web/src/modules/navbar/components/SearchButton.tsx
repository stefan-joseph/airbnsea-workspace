import { Button } from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { NavbarContext } from "../Navbar";
import {
  searchBarTimingFunction,
  searchBarTransitionTime,
} from "../../../constants/constants";

export const SearchButton = ({
  searchButtonRef,
}: {
  searchButtonRef?: React.RefObject<HTMLButtonElement>;
}) => {
  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);
  return (
    <Button
      ref={searchButtonRef}
      variant="contained"
      type="submit"
      disableElevation
      className="search-button"
      sx={{
        height: subSearch ? 50 : 32,
        width: subSearch ? 120 : 32,
        minWidth: "unset",
        borderRadius: 6,
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
      <SearchIcon sx={{ mr: subSearch ? 1 : 0 }} fontSize="small" />
      {!subSearch ? "" : "Search"}
    </Button>
  );
};
