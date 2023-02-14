import { Box, useMediaQuery } from "@mui/material";
import {
  bottomNavbarHeight,
  desktopMinWidth,
  searchBarHeight,
} from "../constants/constants";
import { Navbar } from "../modules/navbar/Navbar";
import { BottomNavbar } from "./BottomNavbar";

export const AppContainer = ({
  children,
  withoutSearch,
}: {
  children: JSX.Element | (JSX.Element | false)[];
  withoutSearch?: boolean;
}) => {
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
    </Box>
  );
};
