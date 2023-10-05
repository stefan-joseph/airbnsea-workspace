import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

export const ClearButton = ({
  isShowing,
  handleClick,
  margin,
}: {
  isShowing: boolean;
  handleClick: () => void;
  margin?: string;
}) => {
  return (
    <>
      {isShowing && (
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            width: 24,
            height: 24,
            m: margin || undefined,
            // marginRight: "-20px",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <IoClose />
        </IconButton>
      )}
    </>
  );
};
