import { Stack } from "@mui/material";

import {
  raiseOnHoverBoxShadow,
  searchBarBorderColor,
  searchBarTimingFunction,
  searchBarTransitionTime,
} from "../../../constants/constants";
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
        left: "50%",
        transform: "translateX(-50%)",
        transition: `all ${searchBarTransitionTime} ${searchBarTimingFunction} 0s`,
        "&:hover": {
          boxShadow: !subSearch ? raiseOnHoverBoxShadow : undefined,
        },
      }}
    >
      {children}
    </Stack>
  );
};
