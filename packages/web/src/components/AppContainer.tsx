import { Box, useMediaQuery } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: !matches && withoutSearch ? undefined : `${searchBarHeight}px`,
        mb: !matches ? `${bottomNavbarHeight}px` : undefined,
      }}
    >
      <Navbar withoutSearch={!!withoutSearch} />
      {children}
      {!matches && <BottomNavbar />}
      {!location.pathname.includes("inbox") && !error && (
        <Box mt="auto">
          <SiteMap />
        </Box>
      )}
    </Box>
  );
};
