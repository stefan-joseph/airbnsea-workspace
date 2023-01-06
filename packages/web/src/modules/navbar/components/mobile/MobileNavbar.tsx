import {
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { searchBarBorderColor } from "../../../../constants/constants";
import { Where } from "./sub-search-components/Where";
import { When } from "./sub-search-components/When";
import { Who } from "./sub-search-components/Who";
import { NavbarContext } from "../../Navbar";
import { SearchBarForm } from "../SearchBarForm";
import { Field, FieldProps } from "formik";

export const MobileNavbar = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);
  return (
    <SearchBarForm>
      <>
        <Paper
          onClick={() =>
            dispatch({
              type: "SET_SUB_SEARCH",
              payload: 1,
            })
          }
          elevation={2}
          sx={{ width: "100%", height: 55, borderRadius: 7 }}
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
                  Anywhere
                </Typography>
                <Typography fontSize="inherit" color="inherit" noWrap>
                  Any week
                </Typography>
                <Typography fontSize="inherit" color="inherit" noWrap>
                  Add guests
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
        <Drawer open={!!subSearch} anchor="bottom" sx={{ height: "100vh" }}>
          <Stack
            spacing={1.2}
            width={"100vw"}
            height={"100vh"}
            padding={2}
            sx={{ backgroundColor: "grey.100" }}
          >
            <Stack direction="row">
              <IconButton
                onClick={() =>
                  dispatch({
                    type: "SET_SUB_SEARCH",
                    payload: 0,
                  })
                }
              >
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Where />
            <When />
            <Who />
          </Stack>
          <Paper sx={{ position: "absolute", bottom: 0, width: "100vw" }}>
            <Field>
              {({ form: { handleSubmit, setFieldValue } }: FieldProps) => (
                <Stack direction="row" justifyContent="space-between" p={1}>
                  <Button
                    onClick={() => {
                      setFieldValue("where", null);
                      setFieldValue("start", null);
                      setFieldValue("end", null);
                      setFieldValue("guests", null);
                    }}
                  >
                    Clear all
                  </Button>
                  <Button
                    onClick={() => {
                      handleSubmit();
                      dispatch({
                        type: "SET_SUB_SEARCH",
                        payload: 0,
                      });
                    }}
                    variant="contained"
                    sx={{
                      fontSize: 17,
                      textTransform: "unset",
                      borderRadius: 2,
                    }}
                  >
                    <SearchRoundedIcon sx={{ fonstSize: 20, mr: 1 }} />
                    Search
                  </Button>
                </Stack>
              )}
            </Field>
          </Paper>
        </Drawer>
      </>
    </SearchBarForm>
  );
};
