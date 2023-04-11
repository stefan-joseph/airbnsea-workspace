import { Stack, Typography } from "@mui/material";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { appSidePadding, searchBarBorderColor } from "../constants/constants";
import { theme } from "../MuiTheme";
import { IoLogoGithub } from "react-icons/io";

export const SiteMap = () => {
  const location = useLocation();
  const [searcharams] = useSearchParams();
  const where = searcharams.get("where");
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      borderTop="1px solid"
      borderColor={searchBarBorderColor}
      pt={1.6}
      pb={1.7}
      pr={appSidePadding}
      pl={appSidePadding}
      position={location.pathname === "/" && !where ? "fixed" : "initial"}
      bottom={0}
      width="100%"
      sx={{ backgroundColor: theme.palette.common.white }}
    >
      <Typography fontSize={14} color="grey.700">
        © 2023 Airbnsea, Inc.
      </Typography>
      <Typography fontSize={14} fontWeight={600}>
        A website by Stefan Joseph
      </Typography>
      <a href="https://github.com/stefan-joseph">
        <Typography
          fontSize={14}
          // fontWeight={600}
          display="flex"
          alignItems="center"
          gap={1}
          color="grey.700"
        >
          <IoLogoGithub size={22} color={theme.palette.common.black} />{" "}
        </Typography>
      </a>
    </Stack>
  );
};
