import { Box, SxProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SailingSharpIcon from "@mui/icons-material/SailingSharp";

export const HomeIcon: React.FC<{ sx: SxProps }> = ({ sx }) => {
  return (
    <Link to="/" style={{ fontSize: "1em" }}>
      <Box
        display="flex"
        alignItems="baseline"
        gap="0.2em"
        sx={{ ...sx }}
        color="primary.main"
      >
        <Box
          component="div"
          display="flex"
          fontSize="1.2em"
          fontWeight={400}
          sx={{
            flexDirection: "column",
            transform: "translateY(-0.09em)",
            fontStyle: "Mori",
          }}
        >
          <Box height=".24em">〜</Box>
          <Box height=".24em">〜</Box>
          <Box height=".24em">〜</Box>
        </Box>
        <Typography
          variant="h1"
          color="primary"
          fontStyle="Mori"
          sx={{
            display: "flex",
            alignItems: "baseline",
            fontWeight: 700,
            fontSize: "1em",
            fontFamily: "Pangram",
          }}
        >
          <Box
            component="span"
            fontSize="0.9em"
            color="grey.800"
            fontFamily="Pangram"
          >
            airbn
          </Box>
          sea
        </Typography>
      </Box>
    </Link>
  );
};
