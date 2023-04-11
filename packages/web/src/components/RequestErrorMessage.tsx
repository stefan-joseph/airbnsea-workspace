import { Box, Stack, Typography } from "@mui/material";
import { MdError } from "react-icons/md";

import { theme } from "../MuiTheme";

export const RequestErrorMessage = () => {
  return (
    <Stack
      direction="row"
      m={2}
      p={1}
      gap={1}
      borderRadius={2}
      border="1px solid"
      borderColor={`${theme.palette.error.main} ${theme.palette.grey[300]} ${theme.palette.grey[300]}`}
      boxShadow={theme.shadows[3]}
      sx={{ borderWidth: "8px 1px 1px" }}
    >
      <Box>
        <MdError color={theme.palette.error.main} size={18} />
      </Box>
      <Stack>
        <Typography fontWeight={600} gutterBottom>
          Something went wrong
        </Typography>
        <Typography color="grey.800" fontSize={14} fontWeight={300}>
          Unfortunately, a server error prevented your request from being
          completed. Airbnsea may be undergoing maintenance or your connection
          may have timed out. Please refresh the page or try again.
        </Typography>
      </Stack>
    </Stack>
  );
};
