import { TextField } from "@mui/material";

export const DateTextField = ({
  value,
  disabled,
}: {
  value: string | null;
  disabled?: boolean;
}) => {
  return (
    <TextField
      value={value || ""}
      placeholder="Add date"
      label="CHECK-IN"
      variant="standard"
      focused={false}
      disabled={disabled}
      sx={{
        borderRadius: 2,
        p: 0.4,
        pl: 1,
        pr: 0,
        "& fieldset": { border: "none" },
      }}
      InputProps={{ disableUnderline: true, readOnly: true }}
      InputLabelProps={{
        shrink: true,
        sx: { p: 1, color: "black", fontWeight: 900 },
      }}
    />
  );
};
