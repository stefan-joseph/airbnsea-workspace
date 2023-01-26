import { ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import { searchBarBorderColor } from "../../../../../constants/constants";
import { NavbarContext } from "../../../Navbar";
import { useSearchParams } from "react-router-dom";
import { formatSearchedLocation } from "../../../../../utils/formatSearchedLocation";
import { formatDateRange } from "../../../../../utils/formatDateRange";

export const DisplayBar = () => {
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const who = searchParams.get("guests");

  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);
  return (
    <Paper
      onClick={() =>
        dispatch({
          type: "SET_SUB_SEARCH",
          payload: -1,
        })
      }
      elevation={2}
      sx={{ width: "100%", height: 55, borderRadius: 7, cursor: "pointer" }}
    >
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        marginLeft={2}
        marginRight={1.4}
      >
        <SearchRoundedIcon />
        <Stack flex={1}>
          <Typography fontSize={15} fontWeight={700}>
            Where to?
          </Typography>
          <Stack
            spacing={0.8}
            direction="row"
            alignItems="center"
            divider={<span>•</span>}
            color="grey.600"
            fontSize={12}
          >
            <Typography fontSize="inherit" color="inherit" noWrap>
              {where ? formatSearchedLocation(where) : "Anywhere"}
            </Typography>
            <Typography fontSize="inherit" color="inherit" noWrap>
              {start && end ? formatDateRange(start, end) : "Any week"}{" "}
            </Typography>
            <Typography fontSize="inherit" color="inherit" noWrap>
              {who ? `${who} guest${+who !== 1 ? "s" : ""}` : "Add guests"}
            </Typography>
          </Stack>
        </Stack>
        <ButtonBase
          sx={{
            border: "1px solid",
            borderColor: searchBarBorderColor,
            borderRadius: "50%",
            p: 1,
          }}
        >
          <TuneRoundedIcon fontSize="small" />
        </ButtonBase>
      </Stack>
    </Paper>
  );
};
