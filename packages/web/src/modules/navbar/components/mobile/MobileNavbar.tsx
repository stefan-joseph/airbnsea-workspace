import { Button, Drawer, IconButton, Paper, Stack } from "@mui/material";
import { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Field, FieldProps } from "formik";

import { Where } from "./sub-search-components/Where";
import { When } from "./sub-search-components/When";
import { Who } from "./sub-search-components/Who";
import { NavbarContext } from "../../Navbar";
import { SearchBarForm } from "../SearchBarForm";
import { DisplayBar } from "./components/DisplayBar";
import { BottomToolbar } from "./components/BottomToolbar";

export const MobileNavbar = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  return (
    <SearchBarForm>
      <>
        <DisplayBar />
        <Drawer open={!!subSearch} anchor="bottom" sx={{ height: "100vh" }}>
          <Stack
            width={"100vw"}
            height={"100vh"}
            padding={subSearch !== 1 && subSearch !== 2 ? 2 : 0}
            paddingTop={7}
            sx={{ backgroundColor: "grey.100" }}
          >
            <Stack direction="row">
              <IconButton
                onClick={() => {
                  if (subSearch === -1 || subSearch === 3) {
                    dispatch({
                      type: "SET_SUB_SEARCH",
                      payload: 0,
                    });
                  } else {
                    dispatch({
                      type: "SET_SUB_SEARCH",
                      payload: -1,
                    });
                  }
                }}
                sx={{ position: "fixed", top: 8, left: 12 }}
              >
                {subSearch === -1 || subSearch === 3 ? (
                  <CloseRoundedIcon />
                ) : (
                  <ArrowBackRoundedIcon />
                )}
              </IconButton>
            </Stack>
            <Where />
            <When />
            <Who />
          </Stack>
          <BottomToolbar />
        </Drawer>
      </>
    </SearchBarForm>
  );
};
