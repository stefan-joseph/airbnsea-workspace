import { Box, Stack, Typography } from "@mui/material";
import { MdError } from "react-icons/md";

import { theme } from "../MuiTheme";

export const RequestErrorMessage = ({
  header,
  body,
  margin,
  addBoxShadow,
}: {
  header?: string;
  body?: string;
  margin?: number;
  addBoxShadow?: boolean;
}) => {
  return (
    <Stack
      direction="row"
      m={margin}
      p={1}
      gap={1}
      borderRadius={2}
      border="1px solid"
      borderColor={`${theme.palette.error.main} ${theme.palette.grey[300]} ${theme.palette.grey[300]}`}
      boxShadow={addBoxShadow ? theme.shadows[3] : undefined}
      sx={{ borderWidth: "8px 1px 1px" }}
    >
      <Box>
        <MdError color={theme.palette.error.main} size={18} />
      </Box>
      <Stack>
        <Typography fontWeight={600} gutterBottom>
          {header || "Something went wrong"}
        </Typography>
        <Typography color="grey.800" fontSize={14} fontWeight={300}>
          {body ||
            "Unfortunately, a server error prevented your request from being completed. Airbnsea may be undergoing maintenance or your connection may have timed out. Please refresh the page or try again."}
        </Typography>
      </Stack>
    </Stack>
  );
};
