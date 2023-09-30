import { TextField } from "@mui/material";
import { FieldProps } from "formik";
import { ReactNode } from "react";

export const TextInput2: React.FC<
  FieldProps<any> & {
    placeholder: string;
    type: string;
  }
> = ({ field: { ...field }, form: { touched, errors }, ...props }) => {
  const errorMsg = touched[field.name] && errors[field.name];
  return (
    <TextField
      {...field}
      {...props}
      error={!!errorMsg}
      helperText={errorMsg as ReactNode}
      sx={{ mt: 1.2 }}
      InputProps={{
        sx: {
          borderRadius: 2,
        },
      }}
      InputLabelProps={{
        shrink: true,
        sx: {
          fontSize: 19,
          backgroundColor: "#FFF",
          pr: 0.6,
          color: "rgba(0, 0, 0, 0.67)",
        },
      }}
    />
  );
};
