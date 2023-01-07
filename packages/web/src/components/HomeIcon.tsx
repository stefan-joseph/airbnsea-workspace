import { Box, SxProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SailingSharpIcon from "@mui/icons-material/SailingSharp";

export const HomeIcon: React.FC<{ sx: SxProps }> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Link to="/" style={{ fontSize: "1em" }}>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            fontSize: "1em",
          }}
        >
          <SailingSharpIcon
            color="primary"
            sx={{
              marginRight: -0.2,
              fontSize: "1.4em",
            }}
          />
          irBnSeaa
        </Typography>
      </Link>
    </Box>
  );
};
