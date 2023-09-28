import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../../../MuiTheme";

export default function AuthLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <Stack
      component={Link}
      to={href}
      paddingTop={2}
      paddingBottom={2}
      fontSize={14}
      color={theme.palette.primary.main}
    >
      {text}
    </Stack>
  );
}
