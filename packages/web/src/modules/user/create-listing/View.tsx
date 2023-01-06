import Grid from "@mui/material/Grid";
import Cyan from "@mui/material/colors/cyan";
import { Box, Button, Typography } from "@mui/material";
import SailingOutlinedIcon from "@mui/icons-material/SailingOutlined";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  children: any;
}

export const View = (props: Props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{ position: "absolute", top: 0, left: 0, padding: "1vw" }}
      >
        <SailingOutlinedIcon sx={{ color: "#FFF" }} fontSize="large" />
      </Link>
      <Grid
        item
        xs={6}
        sx={{
          padding: 5,
          height: "100%",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: "#FFF" }}>
          {props.text}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ height: "100%" }}>
        {props.children}
      </Grid>
    </Grid>
  );
};
