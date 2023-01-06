import { HomeIcon } from "../../../../components/HomeIcon";
import { DesktopSearchBar } from "./DesktopSearchBar";
import { UserMenu } from "../UserMenu";

export const DesktopNavbar = () => {
  return (
    <>
      <HomeIcon sx={{ fontSize: 26, display: "flex", alignItems: "center" }} />
      <DesktopSearchBar />
      <UserMenu />
    </>
  );
};
