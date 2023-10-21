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
      pt={!matches && withoutSearch ? undefined : `${searchBarHeight}px`}
      pb={
        !matches
          ? `${bottomNavbarHeight}px`
          : !location.pathname.includes("inbox")
          ? "46.2px"
          : undefined
      }
      minHeight="100vh"
    >
      <Navbar withoutSearch={!!withoutSearch} />
      {children}
      {!matches && <BottomNavbar />}
      {!location.pathname.includes("inbox") && !error && matches && (
        <Box mt="auto">
          <SiteMap />
        </Box>
      )}
    </Stack>
  );
};
