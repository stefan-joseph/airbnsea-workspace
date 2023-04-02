import { Box } from "@mui/material";
import { HomeIcon } from "../../../components/HomeIcon";

export const AuthPageContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HomeIcon
        sx={{
          position: "absolute",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          fontSize: { xs: 26, md: 30 },
        }}
      />
      {children}
    </Box>
  );
};
