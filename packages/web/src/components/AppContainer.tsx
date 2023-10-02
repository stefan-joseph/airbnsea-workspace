import { Box, Stack, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  bottomNavbarHeight,
  desktopMinWidth,
  searchBarHeight,
} from "../constants/constants";
import { Navbar } from "../modules/navbar/Navbar";
import { BottomNavbar } from "./BottomNavbar";
import { SiteMap } from "./SiteMap";

export const AppContainer = ({
  children,
  withoutSearch,
  error,
}: {
  children: JSX.Element | (JSX.Element | false)[];
  withoutSearch?: boolean;
  error?: boolean;
}) => {
  const location = useLocation();
  const matches = useMediaQuery(desktopMinWidth);
  return (
    <Stack
      flexDirection="column"
      mt={!matches && withoutSearch ? undefined : `${searchBarHeight}px`}
      mb={!matches ? `${bottomNavbarHeight}px` : "46.2px"}
    >
      <Navbar withoutSearch={!!withoutSearch} />
      {children}
      {!matches && <BottomNavbar />}
      {!location.pathname.includes("inbox") && !error && (
        <Box mt="auto">
          <SiteMap />
        </Box>
      )}
    </Stack>
  );
};
