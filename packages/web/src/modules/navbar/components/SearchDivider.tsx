import { Divider } from "@mui/material";
import {
  searchBarBackgroundColor,
  searchBarBorderColor,
} from "../../../constants/constants";

type Props = {
  isHidden: boolean;
  height?: number;
  dividerRefs?: React.MutableRefObject<HTMLHRElement[]>;
  refPosition?: number;
};

export const SearchDivider = ({
  isHidden,
  height,
  dividerRefs,
  refPosition,
}: Props) => (
  <Divider
    ref={(e) => {
      if (e && dividerRefs && refPosition) dividerRefs.current[refPosition] = e;
    }}
    orientation="vertical"
    variant="middle"
    flexItem
    sx={{
      height: height || "30px",
      display: "flex",
      alignSelf: "center",
      borderColor: isHidden ? searchBarBackgroundColor : searchBarBorderColor,
      transition: "all 200ms linear 0s",
    }}
  />
);
