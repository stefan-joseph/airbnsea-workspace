import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />{" "}
    </Box>
  );
};
