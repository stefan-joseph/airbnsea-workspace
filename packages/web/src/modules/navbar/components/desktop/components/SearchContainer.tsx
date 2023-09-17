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
      className="babyyyy"
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
          ? "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)"
          : undefined,
        transform: "translateX(-50%)",
        transition: `all ${searchBarTransitionTime}ms ${searchBarTimingFunction} 0s`,
        "&:hover": {
          boxShadow: !subSearch ? " 0 2px 4px rgba(0,0,0,0.18);" : undefined,
        },
      }}
    >
      {children}
    </Stack>
  );
};
