import { Box } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

export default function Loader({
  color,
  size,
}: {
  color?: CircularProgressProps["color"];
  size?: CircularProgressProps["size"];
}) {
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
      <CircularProgress color={color} size={size} />
    </Box>
  );
}
