import { Button } from "@mui/material";

type Props = {
  text: string;
  handleClick: () => void;
  maxWidth?: number | string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const OutlinedButton = ({
  text,
  handleClick,
  maxWidth,
  type,
  disabled,
}: Props) => {
  return (
    <Button
      onClick={() => {
        console.log(disabled);
        handleClick();
      }}
      variant="outlined"
      fullWidth
      type={type || "button"}
      disabled={disabled || false}
      sx={{
        textTransform: "unset",
        fontSize: 15,
        fontWeight: 700,
        whiteSpace: "nowrap",
        p: 1,
        pl: 2,
        pr: 2,
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
