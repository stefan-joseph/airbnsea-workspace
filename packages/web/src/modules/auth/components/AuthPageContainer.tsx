import { Stack } from "@mui/material";
import { HomeIcon } from "../../../components/HomeIcon";
import { appSidePadding } from "../../../constants/constants";

export const AuthPageContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <Stack
      marginLeft={appSidePadding}
      marginRight={appSidePadding}
      sx={{ minHeight: "100vh" }}
    >
      <HomeIcon
        sx={{
          fontSize: { xs: 26, md: 30 },
          marginBottom: 8,
          marginTop: 2,
        }}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        marginTop="auto"
        marginBottom="auto"
      >
        {children}
      </Stack>
    </Stack>
  );
};
