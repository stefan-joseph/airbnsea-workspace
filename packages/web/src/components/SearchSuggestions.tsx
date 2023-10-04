import { Box, Grid, Typography } from "@mui/material";
import { borderRadius, searchBarBorderColor } from "../constants/constants";
import { Field, FieldProps } from "formik";
import { useContext } from "react";

import { NavbarContext } from "../modules/auth/Navbar";
import { ReactComponent as Mexico } from "../assets/svg/mexico.svg";
import { ReactComponent as Canada } from "../assets/svg/canada.svg";
import { ReactComponent as World } from "../assets/svg/world.svg";
import { ReactComponent as Italy } from "../assets/svg/italy.svg";
import { ReactComponent as Vietnam } from "../assets/svg/vietnam.svg";
import { ReactComponent as Australia } from "../assets/svg/australia.svg";

export const SearchSuggestions = ({
  handleClick,
  slider,
}: {
  handleClick: (value: string) => void;
  slider?: boolean;
}) => {
  const { dispatch } = useContext(NavbarContext);

  const suggestions = [
    { name: "I'm flexible", svg: <World />, value: null },
    { svg: <Canada />, value: "Canada" },
    { svg: <Mexico />, value: "Mexico" },
    { svg: <Italy />, value: "Italy" },
    { svg: <Australia />, value: "Australia" },
    { svg: <Vietnam />, value: "Vietnam" },
  ];
  return (
    <>
      {!slider && (
        <Typography fontWeight={600} padding={3}>
          Search by region
        </Typography>
      )}
      <Box overflow="hidden" height={slider ? 162 : "unset"}>
        <Box
          width="100%"
          paddingLeft={slider ? 2 : 3}
          paddingBottom={slider ? 2 : 3}
          sx={{ overflowX: "scroll" }}
          height={slider ? 174 : "unset"}
        >
          <Field name="where">
            {({ field: { value: formValue } }: FieldProps) => (
              <Grid
                container
                rowSpacing={3}
                flexWrap="wrap"
                minWidth={slider ? 840 : "unset"}
              >
                {suggestions.map(({ name, svg, value }) => {
                  const selected =
                    formValue === value || (!value && !formValue);

                  return (
                    <Grid key={value || name} item xs={slider ? 2 : 4}>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => {
                          dispatch({
                            type: "SET_SUB_SEARCH",
                            payload: 2,
                          });
                          handleClick(value === null ? "" : value);
                        }}
                        border={selected ? "1.6px solid" : "1px solid"}
                        borderColor={
                          selected ? "initial" : searchBarBorderColor
                        }
                        borderRadius={borderRadius}
                        display="flex"
                        alignItems="center"
                        width={120}
                        height={120}
                        mb={1}
                        sx={{
                          aspectRatio: "1/1",
                          cursor: "pointer",
                          backgroundColor: "grey.50",
                          "&:hover": { borderColor: "initial" },
                        }}
                      >
                        {svg}
                      </Box>

                      <Typography
                        paddingLeft={0.3}
                        fontSize={15}
                        fontWeight={
                          formValue === name || formValue === value
                            ? 600
                            : "initial"
                        }
                      >
                        {name || value}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Field>
        </Box>
      </Box>
    </>
  );
};
