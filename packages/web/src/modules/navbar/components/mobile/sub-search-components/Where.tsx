import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useContext, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { GoogleLocationAutoComplete } from "../../../../../components/fields/GoogleLocationAutoComplete";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../components/CollapsedSubSearch";
import { ExpandedSubSearch } from "../components/ExpandedSubSearch";
import { formatSearchedLocation } from "../../../../../utils/formatSearchedLocation";
import { SearchSuggestions } from "../../../../../components/SearchSuggestions";

export const Where = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  if (subSearch === 2) return null;

  if (subSearch !== 1) {
    return (
      <Field name="where">
        {({ field: { value } }: FieldProps) => (
          <CollapsedSubSearch
            value={value ? formatSearchedLocation(value) : "Anywhere"}
            text="Where"
            subtitle="Where to?"
            handleClick={() => {
              if (subSearch !== -1) {
                dispatch({
                  type: "SET_SUB_SEARCH",
                  payload: -1,
                });
              }
            }}
            selected={subSearch === -1}
          >
            <Box margin={2}>
              <TextField
                placeholder="Search destinations"
                value={value || ""}
                onClick={() =>
                  dispatch({
                    type: "SET_SUB_SEARCH",
                    payload: 1,
                  })
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon color="info" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ".MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                  // width: "96%",
                }}
              />
            </Box>
            <SearchSuggestions slider />
          </CollapsedSubSearch>
        )}
      </Field>
    );
  }

  return (
    <ExpandedSubSearch text="Where to?">
      <Field name="where">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
          <GoogleLocationAutoComplete
            isMobile
            paperComponent={(props) => (
              <Box {...props} sx={{ width: "100vw", ml: -3 }}></Box>
            )}
            renderInput={(params, setOpen) => (
              <TextField
                variant="filled"
                autoFocus
                {...params}
                fullWidth={false}
                placeholder="Enter the address"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchRoundedIcon color="info" sx={{ ml: -1, mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ display: value ? undefined : "none" }}
                    >
                      <CloseRoundedIcon
                        onClick={() => {
                          setFieldValue("where", null);
                          setOpen(false);
                        }}
                        color="info"
                        sx={{
                          borderRadius: "50%",
                          height: 22,
                          width: 22,
                          padding: "2px",
                          cursor: "pointer",
                          backgroundColor: "grey.300",
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    ml: 3,
                    mr: 3,
                    borderRadius: 3,
                    backgroundColor: "grey.100",
                    "&:hover": {
                      backgroundColor: "grey.100",
                    },
                    "&.MuiFilledInput-root": {
                      p: 2,
                    },
                  },
                }}
                sx={{
                  width: "100%",
                }}
              />
            )}
            textFieldProps={{
              placeholder: "Search Destinations",
              variant: "standard",
              label: "",
            }}
            textFieldInputProps={{
              disableUnderline: true,
              endAdornment: undefined,
              sx: {
                fontSize: 14,
              },
            }}
            onInputChange={(value) =>
              setFieldValue && setFieldValue("where", value)
            }
            outsideValue={value ? value : undefined}
            popperWidth={400}
            // noValueDisplayComponent={
            //   // searchBarRef ? (
            //   //   <PopperMenu
            //   //     open={(index as number) + 1 === subSearch}
            //   //     anchorEl={searchBarRef}
            //   //     placement="bottom-start"
            //   //     marginTop={1}
            //   //     width={460}
            //   //     disableAnimation={!!value}
            //   //   >
            //   // <Box border="1px solid red">
            //   <SearchSuggestions />
            //   // </Box>
            //   // {/* </PopperMenu> */}
            //   // ) : undefined
            // }
          />
        )}
      </Field>
    </ExpandedSubSearch>
  );
};
