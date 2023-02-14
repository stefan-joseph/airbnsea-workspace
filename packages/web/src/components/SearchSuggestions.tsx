import { Box, Grid, Typography } from "@mui/material";
import { borderRadius, searchBarBorderColor } from "../constants/constants";
import { Field, FieldProps } from "formik";
import { useContext } from "react";

import { NavbarContext } from "../modules/navbar/Navbar";
import { ReactComponent as Mexico } from "../assets/svg/mexico.svg";
import { ReactComponent as Canada } from "../assets/svg/canada.svg";
import { ReactComponent as World } from "../assets/svg/world.svg";
import { ReactComponent as Italy } from "../assets/svg/italy.svg";
import { ReactComponent as Vietnam } from "../assets/svg/vietnam.svg";
import { ReactComponent as Australia } from "../assets/svg/australia.svg";

export const SearchSuggestions = ({ slider }: { slider?: boolean }) => {
  const { dispatch } = useContext(NavbarContext);

  const suggestions = [
    { name: "I'm flexible", svg: <World />, value: null },
    { name: "Canada", svg: <Canada /> },
    { name: "Mexico", svg: <Mexico /> },
    { name: "Italy", svg: <Italy /> },
    { name: "Australia", svg: <Australia /> },
    { name: "Vietnam", svg: <Vietnam /> },
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
            {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
              <Grid
                container
                rowSpacing={3}
                flexWrap="wrap"
                minWidth={slider ? 840 : "unset"}
              >
                {suggestions.map(({ name, svg, value: value2 }) => {
                  const selected =
                    value === name ||
                    value === value2 ||
                    (value2 === null && !value);
                  return (
                    <Grid key={name} item xs={slider ? 2 : 4}>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => {
                          setFieldValue("where", value2 === null ? null : name);
                          dispatch({
                            type: "SET_SUB_SEARCH",
                            payload: 2,
                          });
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
                          value === name || value === value2 ? 600 : "initial"
                        }
                      >
                        {name}
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
