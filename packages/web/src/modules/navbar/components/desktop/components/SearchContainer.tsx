import { Paper, Stack } from "@mui/material";

import {
  raiseOnHoverBoxShadow,
  searchBarBorderColor,
  searchBarTimingFunction,
  searchBarTransitionTime,
} from "../../../../../constants/constants";
import { SearchDivider } from "./SearchDivider";

type Props = {
  children: JSX.Element[];
  subSearch: number;
  searchBarRef: React.RefObject<HTMLDivElement>;
};

export const SearchContainer = ({
  children,
  subSearch,
  searchBarRef,
}: Props) => {
  return (
    <Stack
      ref={searchBarRef}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={!subSearch ? 1 : 0}
      divider={<SearchDivider isHidden={subSearch !== 0} height={20} />}
      sx={{
        width: subSearch ? "90vw" : "50%",
        maxWidth: subSearch ? "860px" : "550px",
        mt: subSearch ? 7 : 0,
        borderRadius: 8,
        backgroundColor: subSearch ? "grey.100" : "#FFF",
        border: "1px solid",
        borderColor: searchBarBorderColor,
        position: "absolute",
        top: 14.5,
        left: "50%",
        boxShadow: !subSearch
          ? "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
          : undefined,
        transform: "translateX(-50%)",
        transition: `all ${searchBarTransitionTime}ms ${searchBarTimingFunction} 0s`,
        "&:hover": {
          boxShadow: !subSearch ? raiseOnHoverBoxShadow : undefined,
        },
      }}
    >
      {children}
    </Stack>
  );
};
