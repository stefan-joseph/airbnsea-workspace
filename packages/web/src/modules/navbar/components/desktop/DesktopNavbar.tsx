import { HomeIcon } from "../../../../components/HomeIcon";
import { DesktopSearchBar } from "./components/DesktopSearchBar";
import { UserMenu } from "./components/UserMenu";

export const DesktopNavbar = () => {
  return (
    <>
      <HomeIcon sx={{ fontSize: 26, mt: 1 }} />
      <DesktopSearchBar />
      <UserMenu />
    </>
  );
};
