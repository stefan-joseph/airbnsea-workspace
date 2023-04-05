import { Box } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

export const Loader = ({
  color,
}: {
  color?: CircularProgressProps["color"];
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress color={color} />
    </Box>
  );
};
