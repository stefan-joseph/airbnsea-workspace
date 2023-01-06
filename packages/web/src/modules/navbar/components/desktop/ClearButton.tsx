import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const ClearButton = ({
  isShowing,
  handleClick,
  marginRight,
}: {
  isShowing: boolean;
  handleClick: () => void;
  marginRight?: number | string;
}) => {
  return (
    <>
      {isShowing && (
        <IconButton
          onClick={handleClick}
          sx={{
            width: 24,
            height: 24,
            marginRight: marginRight || null,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );
};
