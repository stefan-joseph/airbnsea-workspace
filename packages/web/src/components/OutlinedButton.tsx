import { Button } from "@mui/material";

type Props = {
  text: string;
  handleClick: () => void;
  maxWidth?: number | string;
};

export const OutlinedButton = ({ text, handleClick, maxWidth }: Props) => {
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      fullWidth
      sx={{
        textTransform: "unset",
        fontSize: 15,
        fontWeight: 700,
        whiteSpace: "nowrap",
        p: 1,
        borderRadius: 3,
        color: "info.main",
        borderColor: "info.main",
        borderWidth: 1.5,
        maxWidth: maxWidth,
        "&:hover": {
          backgroundColor: "rgb(0, 0, 0, 0.03)",
          borderColor: "unset",
          borderWidth: 1.5,
        },
      }}
    >
      {text}
    </Button>
  );
};
