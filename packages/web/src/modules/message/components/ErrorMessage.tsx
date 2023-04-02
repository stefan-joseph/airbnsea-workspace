import { ApolloError } from "@apollo/client";
import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import { IoIosAlert } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import {
  borderRadius,
  searchBarBorderColor,
} from "../../../constants/constants";

export const ErrorMessage = ({ error }: { error: ApolloError }) => {
  const navigate = useNavigate();

  return (
    <Box
      border="1px solid"
      borderColor={searchBarBorderColor}
      borderRadius={borderRadius}
      margin={1}
      padding={1}
      display="flex"
    >
      <SvgIcon
        component={IoIosAlert}
        inheritViewBox
        color="error"
        sx={{ fontSize: 50 }}
      />
      <Stack ml={1}>
        <Typography fontWeight={600} gutterBottom>
          {error?.message}
        </Typography>
        {/* for secondary error message */}
        {/* <Typography gutterBottom>
            Please select another conversation
          </Typography> */}
        <Button
          onClick={() => navigate(0)}
          variant="outlined"
          sx={{ maxWidth: "fit-content", fontWeight: 600 }}
        >
          Try again
        </Button>
      </Stack>
    </Box>
  );
};
